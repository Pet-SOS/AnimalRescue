using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AnimalRescue.Contracts.BusinessLogic.Interfaces;
using AnimalRescue.Contracts.BusinessLogic.Models;
using AnimalRescue.Contracts.BusinessLogic.Models.History;
using AnimalRescue.Infrastructure.Validation;

namespace AnimalRescue.BusinessLogic.Queries
{
    public class HistoryTagDecorator : HistoryDecorator<TagDto, TagDto, Guid>, ITagService
    {
        private readonly ITagService tagService;

        public HistoryTagDecorator(ITagService tagService, IBlFullCrud<HistoryDto, HistoryDto, Guid> historyService) :
            base(tagService, historyService)
        {
            Require.Objects.NotNull(tagService, nameof(tagService));

            this.tagService = tagService;
        }


        public async Task<IEnumerable<TagDto>> CreateIfNotExistAsync(IEnumerable<TagDto> value)
        {
            var result = await tagService.CreateIfNotExistAsync(value);

            if (!result.Any())
            {
                return result;
            }

            result = await tagService.WhereAsync(result);

            foreach (TagDto element in result)
            {
                await CreateHistoryAsync(element);
            }

            return result;
        }

        public async Task<IEnumerable<TagDto>> WhereAsync(IEnumerable<TagDto> value) => await tagService.WhereAsync(value);
    }
}
