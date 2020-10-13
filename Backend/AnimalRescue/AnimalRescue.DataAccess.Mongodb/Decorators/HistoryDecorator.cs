using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Models.BaseItems;
using AnimalRescue.DataAccess.Mongodb.Models.History;
using AnimalRescue.DataAccess.Mongodb.Query;
using MongoDB.Bson;
using Newtonsoft.Json;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace AnimalRescue.DataAccess.Mongodb.Decorators
{
    internal class HistoryDecorator<TEntity> : IBaseRepository<TEntity>
        where TEntity : IBaseAuditItem
    {
        private readonly IBaseRepository<TEntity> _entityRepository;
        private readonly IBaseRepository<History> _historyRepository;

        public HistoryDecorator(IBaseRepository<TEntity> entityRepository, IBaseRepository<History> historyRepository)
        {
            _entityRepository = entityRepository;
            _historyRepository = historyRepository;
        }

        public Task<BsonValue> ExecuteScriptAsync(string javascript) => _entityRepository.ExecuteScriptAsync(javascript);

        public IAsyncEnumerable<TEntity> GetAllItemsAsync() => _entityRepository.GetAllItemsAsync();

        public Task<List<TEntity>> GetAsync(DbQuery query) => _entityRepository.GetAsync(query);

        public Task<TEntity> GetAsync(string query) => _entityRepository.GetAsync(query);

        public Task<int> GetCountAsync(DbQuery query) => _entityRepository.GetCountAsync(query);

        public async Task<TEntity> CreateAsync(TEntity value)
        {
            var result = await _entityRepository.CreateAsync(value);

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

            await _entityRepository.DeleteAsync(id);
            await _historyRepository.CreateAsync(history);
        }

        public async Task UpdateAsync(TEntity value)
        {
            var previousItem = await _entityRepository.GetAsync(value.Id);
            await _entityRepository.UpdateAsync(value);
            await CreateUpdatedHistoryAsync(value, previousItem);
        }

        protected async Task CreateHistoryAsync(TEntity element)
        {
            var history = InitHistory(element.Id, GetCreatedDifferenceValueList(element));

            await _historyRepository.CreateAsync(history);
        }

        protected async Task CreateUpdatedHistoryAsync(TEntity newItem, TEntity previousItem)
        {
            var differences = GetUpdatedDifferenceValueList(newItem, previousItem);

            if (!differences.Any())
            {
                return;
            }

            var history = InitHistory(newItem.Id, differences);

            await _historyRepository.CreateAsync(history);
        }

        private History InitHistory(string id, ICollection<DifferenceValue> differences, bool IsEntityDeleted = false)
        {
            return new History
            {
                EntityName = typeof(TEntity).Name,
                EntityId =id.ToString(),
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
            var result = new List<DifferenceValue>();

            var fieldDictionary = GetFieldsValueDictionary(obj);

            foreach (var field in fieldDictionary)
            {
                result.Add(new DifferenceValue { PropertyName = field.Key, NewValue = field.Value });
            }

            return result;
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

            if (value is IEnumerable)
            {
                return JsonConvert.SerializeObject(value);
            }

            return value.ToString();
        }
    }
}
