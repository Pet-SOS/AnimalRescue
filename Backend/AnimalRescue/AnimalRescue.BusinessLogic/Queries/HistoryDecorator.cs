using AnimalRescue.Contracts.BusinessLogic.Interfaces;
using AnimalRescue.Contracts.BusinessLogic.Models;
using AnimalRescue.Contracts.BusinessLogic.Models.History;
using AnimalRescue.Contracts.Common.Query;
using AnimalRescue.Infrastructure.Validation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

namespace AnimalRescue.BusinessLogic.Queries
{
    public class HistoryDecorator<TOut, TIn, TId> : IBlFullCrud<TOut, TIn, TId>
        where TOut : IBaseDto<TId>
        where TIn : IBaseDto<TId>
    {
        private readonly IBlFullCrud<TOut, TIn, TId> fullCrudService;
        private readonly IBlFullCrud<HistoryDto, HistoryDto, Guid> historyService;

        public HistoryDecorator(IBlFullCrud<TOut, TIn, TId> fullCrudService, IBlFullCrud<HistoryDto, HistoryDto, Guid> historyService)
        {
            Require.Objects.NotNull(fullCrudService, nameof(fullCrudService));
            Require.Objects.NotNull(historyService, nameof(historyService));

            this.fullCrudService = fullCrudService;
            this.historyService = historyService;
        }
        public async Task<TOut> CreateAsync(TIn value)
        {
            var result = await fullCrudService.CreateAsync(value);

            if (result is IEnumerable<TOut> enumerable)
            {
                foreach (TOut element in enumerable)
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

        public async Task UpdateAsync(TOut value)
        {
            var previousItem = await fullCrudService.GetAsync(value.Id);
            await fullCrudService.UpdateAsync(value);
            await CreateUpdatedHistoryAsync(value, previousItem);
        }

        public async Task DeleteAsync(TId id)
        {
            var history = new HistoryDto
            {
                EntityName = typeof(TIn).Name,
                EntityId = id.ToString(),
                IsEntityDeleted = true,
                CreatedAt = DateTime.UtcNow
            };

            await fullCrudService.DeleteAsync(id);
            await historyService.CreateAsync(history);
        }

        public async Task<TOut> GetAsync(TId query) => await fullCrudService.GetAsync(query);
        public async Task<BlCollectonResponse<TOut>> GetAsync(ApiQueryRequest query) => await fullCrudService.GetAsync(query);
        public async Task<int> GetCountAsync(ApiQueryRequest query) => await fullCrudService.GetCountAsync(query);

        protected async Task CreateHistoryAsync(TOut element)
        {
            var history = new HistoryDto
            {
                EntityName = typeof(TIn).Name,
                EntityId = element.Id.ToString(),
                IsEntityDeleted = false,
                CreatedAt = DateTime.UtcNow,
                Differences = GetCreatedDifferenceValueList(element)
            };

            await historyService.CreateAsync(history);
        }

        private async Task CreateUpdatedHistoryAsync(TOut newItem, TOut previousItem)
        {
            var differences = GetUpdatedDifferenceValueList(newItem, previousItem);

            if (!differences.Any())
            {
                return;
            }

            var history = new HistoryDto
            {
                EntityName = typeof(TIn).Name,
                EntityId = newItem.Id.ToString(),
                IsEntityDeleted = false,
                CreatedAt = DateTime.UtcNow,
                Differences = differences
            };

            await historyService.CreateAsync(history);
        }

        private ICollection<DifferenceValueDto> GetUpdatedDifferenceValueList(TOut newItem, TOut previousItem)
        {
            var result = new List<DifferenceValueDto>();

            var newItemFieldDictionary = GetFieldsValueDictionary(newItem);
            var previousItemFieldDictionary = GetFieldsValueDictionary(previousItem);

            foreach (var field in newItemFieldDictionary)
            {
                var diff = new DifferenceValueDto
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

        private ICollection<DifferenceValueDto> GetCreatedDifferenceValueList(TOut obj)
        {
            var result = new List<DifferenceValueDto>();

            var fieldDictionary = GetFieldsValueDictionary(obj);

            foreach (var field in fieldDictionary)
            {
                result.Add(new DifferenceValueDto { PropertyName = field.Key, NewValue = field.Value });
            }

            return result;
        }

        private IDictionary<string, string> GetFieldsValueDictionary(object obj)
        {
            var result = new Dictionary<string, string>();

            var properties = obj.GetType().GetProperties();

            foreach (var prop in properties)
            {
                var value = prop.GetValue(obj);

                if (value == null)
                {
                    break;
                }

                var propertyValue = JsonSerializer.Serialize(value);

                if (!string.IsNullOrWhiteSpace(propertyValue))
                {
                    result.Add(prop.Name, propertyValue);
                }
            }

            return result;
        }

    }
}
