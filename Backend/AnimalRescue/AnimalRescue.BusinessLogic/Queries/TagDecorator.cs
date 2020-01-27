using AnimalRescue.Contracts.BusinessLogic.Attributes;
using AnimalRescue.Contracts.BusinessLogic.Interfaces;
using AnimalRescue.Contracts.BusinessLogic.Models;
using AnimalRescue.Contracts.Common.Query;
using AnimalRescue.Infrastructure.Validation;

using System;
using System.Collections.Generic;
using System.Reflection;
using System.Threading.Tasks;

namespace AnimalRescue.BusinessLogic.Queries
{
    internal class TagDecorator<TOut, TIn> : IBlFullCrud<TOut, TIn>
    {
        private readonly IBlFullCrud<TOut, TIn> fullCrudService;
        private readonly ITagService tagService;

        public TagDecorator(IBlFullCrud<TOut, TIn> fullCrudService, ITagService tagService)
        {
            Require.Objects.NotNull(fullCrudService, nameof(fullCrudService));
            Require.Objects.NotNull(tagService, nameof(tagService));

            this.fullCrudService = fullCrudService;
            this.tagService = tagService;
        }

        public async Task<TOut> CreateAsync(TIn item)
        {
            await tagService.CreateIfNotExistAsync(GetItemTags(item));
            return await fullCrudService.CreateAsync(item);
        }

        public async Task UpdateAsync(TOut item)
        {
            await tagService.CreateIfNotExistAsync(GetItemTags(item));
            await fullCrudService.UpdateAsync(item);
        }

        public async Task DeleteAsync(Guid id) => await fullCrudService.DeleteAsync(id);
        public async Task<TOut> GetAsync(Guid query) => await fullCrudService.GetAsync(query);
        public async Task<BlCollectonResponse<TOut>> GetAsync(ApiQueryRequest query) => await fullCrudService.GetAsync(query);
        public async Task<int> GetCountAsync(ApiQueryRequest query) => await fullCrudService.GetCountAsync(query);

        private IEnumerable<TagDto> GetItemTags<TData>(TData item)
        {
            foreach (PropertyInfo propertyInfo in item.GetType().GetProperties())
            {
                if (propertyInfo.GetCustomAttribute<CouplingPropertyDtoAttribute>()
                    is CouplingPropertyDtoAttribute attribute)
                {
                    object data = propertyInfo.GetValue(item, null);
                    if (data is IEnumerable<object> enumerable)
                    {
                        foreach (object element in enumerable)
                        {
                            yield return GetTagDto(attribute.AliasName, element);
                        }
                    }
                    else
                    {
                        yield return GetTagDto(attribute.AliasName, data);
                    }
                }
            }
        }
        private static TagDto GetTagDto(string type, object title) => 
            new TagDto { Type = type, Title = title?.ToString() }; 
    }
}
