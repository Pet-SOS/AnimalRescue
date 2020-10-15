using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Models.BaseItems;
using AnimalRescue.DataAccess.Mongodb.Models.History;
using AnimalRescue.DataAccess.Mongodb.Query;
using AnimalRescue.Infrastructure.Validation;
using MongoDB.Bson;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace AnimalRescue.DataAccess.Mongodb.Decorators
{
    internal class HistoryDecorator<TEntity> : IBaseRepository<TEntity>
        where TEntity : IBaseAuditItem
    {
        protected readonly IBaseRepository<TEntity> entityRepository;
        protected readonly IBaseRepository<History> historyRepository;

        public HistoryDecorator(IBaseRepository<TEntity> entityRepository, IBaseRepository<History> historyRepository)
        {
            Require.Objects.NotNull(entityRepository, nameof(entityRepository));
            Require.Objects.NotNull(historyRepository, nameof(historyRepository));

            this.entityRepository = entityRepository;
            this.historyRepository = historyRepository;
        }

        public Task<BsonValue> ExecuteScriptAsync(string javascript) => entityRepository.ExecuteScriptAsync(javascript);

        public IAsyncEnumerable<TEntity> GetAllItemsAsync() => entityRepository.GetAllItemsAsync();

        public Task<List<TEntity>> GetAsync(DbQuery query) => entityRepository.GetAsync(query);

        public Task<TEntity> GetAsync(string query) => entityRepository.GetAsync(query);

        public Task<int> GetCountAsync(DbQuery query) => entityRepository.GetCountAsync(query);

        public async Task<TEntity> CreateAsync(TEntity value)
        {
            var result = await entityRepository.CreateAsync(value);

            if (result is IEnumerable<TEntity> enumerable)
            {
                foreach (TEntity element in enumerable)
                {
                    await CreateHistoryAsync(element);
                }
            }
            else
            {
                await CreateHistoryAsync(result);
            }

            return result;
        }

        public async Task DeleteAsync(string id)
        {
            var history = InitHistory(id, null, true);

            await entityRepository.DeleteAsync(id);
            await historyRepository.CreateAsync(history);
        }

        public async Task UpdateAsync(TEntity value)
        {
            var previousItem = await entityRepository.GetAsync(value.Id);
            await entityRepository.UpdateAsync(value);
            await CreateUpdatedHistoryAsync(value, previousItem);
        }

        protected async Task CreateHistoryAsync(TEntity element)
        {
            var history = InitHistory(element.Id, GetCreatedDifferenceValueList(element));

            await historyRepository.CreateAsync(history);
        }

        protected async Task CreateUpdatedHistoryAsync(TEntity newItem, TEntity previousItem)
        {
            var differences = GetUpdatedDifferenceValueList(newItem, previousItem);

            if (!differences.Any())
            {
                return;
            }

            var history = InitHistory(newItem.Id, differences);

            await historyRepository.CreateAsync(history);
        }

        private History InitHistory(string id, ICollection<DifferenceValue> differences, bool IsEntityDeleted = false)
        {
            return new History
            {
                EntityName = typeof(TEntity).Name,
                EntityId = id.ToString(),
                IsEntityDeleted = IsEntityDeleted,
                CreatedAt = DateTime.UtcNow,
                Differences = differences
            };
        }

        private ICollection<DifferenceValue> GetUpdatedDifferenceValueList(TEntity newItem, TEntity previousItem)
        {
            var result = new List<DifferenceValue>();

            var newItemFieldDictionary = GetFieldsValueDictionary(newItem);
            var previousItemFieldDictionary = GetFieldsValueDictionary(previousItem);

            foreach (var field in newItemFieldDictionary)
            {
                var diff = new DifferenceValue
                {
                    PropertyName = field.Key,
                    NewValue = field.Value
                };

                if (previousItemFieldDictionary.TryGetValue(field.Key, out string previousValue))
                {
                    if (!previousValue.Equals(field.Value))
                    {
                        diff.LastValue = previousValue;
                        result.Add(diff);
                    }
                }
                else
                {
                    result.Add(diff);
                }
            }

            return result;
        }

        private ICollection<DifferenceValue> GetCreatedDifferenceValueList(TEntity obj)
        {
            return GetFieldsValueDictionary(obj).Select(f => new DifferenceValue { PropertyName = f.Key, NewValue = f.Value }).ToList();
        }

        private IDictionary<string, string> GetFieldsValueDictionary(object obj)
        {
            var result = new Dictionary<string, string>();

            var properties = obj.GetType().GetProperties();

            foreach (var prop in properties)
            {
                var propertyValue = GetPropertyValue(prop, obj);

                if (!string.IsNullOrWhiteSpace(propertyValue))
                {
                    result.Add(prop.Name, propertyValue);
                }
            }

            return result;
        }

        private string GetPropertyValue(PropertyInfo propertyInfo, object obj)
        {
            var value = propertyInfo.GetValue(obj);

            if (value == null)
            {
                return null;
            }

            if (value is string str)
            {
                return str;
            }

            return JsonConvert.SerializeObject(value);
        }
    }
}
