using AnimalRescue.BusinessLogic.Extensions;
using AnimalRescue.Contracts.BusinessLogic.Interfaces;
using AnimalRescue.Contracts.BusinessLogic.Models;
using AnimalRescue.Contracts.Common.Query;
using AnimalRescue.DataAccess.Mongodb.Exceptions;
using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Models;
using AnimalRescue.Infrastructure.Utilities;
using AnimalRescue.Infrastructure.Validation;

using AutoMapper;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AnimalRescue.BusinessLogic.Services
{
    internal class TagService : ITagService
    {
        private readonly ITagRepository _tagRepository;

        private readonly IMapper mapper;

        public TagService(ITagRepository tagRepository, IMapper mapper)
        {
            Require.Objects.NotNull(mapper, nameof(mapper));
            Require.Objects.NotNull(tagRepository, nameof(tagRepository));

            _tagRepository = tagRepository;
            this.mapper = mapper;
        }

        public async Task<BlCollectonResponse<TagDto>> GetAsync(ApiQueryRequest queryRequest)
        {
            var dbQuery = queryRequest.ToDbQuery();

            var totalCount = await _tagRepository.GetCountAsync(dbQuery);
            if (totalCount == 0)
            {
                return new BlCollectonResponse<TagDto>
                {
                    Collection = new List<TagDto>(),
                    TotalCount = 0
                };
            }

            var tags = await _tagRepository.GetAsync(dbQuery);
            var tagDtos = mapper.Map<List<Tags>, List<TagDto>>(tags);

            return new BlCollectonResponse<TagDto>
            {
                Collection = tagDtos,
                TotalCount = totalCount
            };
        }

        public async Task<TagDto> GetAsync(Guid id)
        {
            var tag = await _tagRepository.GetAsync(id.AsObjectIdString());
            var tagDto = mapper.Map<Tags, TagDto>(tag);

            return tagDto;
        }

        public async Task<TagDto> CreateAsync(TagDto tagDto)
        {
            var tag = mapper.Map<TagDto, Tags>(tagDto);
            tag = await _tagRepository.CreateAsync(tag);
            tagDto = mapper.Map<Tags, TagDto>(tag);

            return tagDto;
        }

        public async Task<IEnumerable<TagDto>> CreateAsync(IEnumerable<TagDto> tagDto)
        {
            var tag = mapper.Map<IEnumerable<TagDto>, IEnumerable<Tags>>(tagDto);
            tag = await _tagRepository.CreateAsync(tag);
            tagDto = mapper.Map<IEnumerable<Tags>, IEnumerable<TagDto>>(tag);

            return tagDto;
        }

        public async Task UpdateAsync(TagDto tagDto)
        {
            var tag = mapper.Map<TagDto, Tags>(tagDto);

            await _tagRepository.UpdateAsync(tag);
        }

        public async Task DeleteAsync(Guid id)
        {
            await _tagRepository.DeleteAsync(id.AsObjectIdString());
        }

        public async Task<List<TagDto>> WhereAsync(List<TagDto> value)
        {
            var tags = mapper.Map<List<TagDto>, List<Tags>>(value);
            var tagDtos = mapper.Map<List<Tags>, List<TagDto>>(await _tagRepository.WhereAsync(tags));

            return tagDtos;
        }

        public async Task CreateIfNotExistAsync(IEnumerable<TagDto> tags)
        {
            IEnumerable<TagDto> tagsFroSafe = await GetFilteredTags(tags.ToList());
            await CreateAsync(tagsFroSafe);
        }

        private async Task<List<TagDto>> GetFilteredTags(List<TagDto> tags) => tags
            .Except(await WhereAsync(tags), new EntityComparer<TagDto>(IsEqual)) 
            .ToList();

        private static bool IsEqual(TagDto x, TagDto y) =>
            x.Title == y.Title && x.Type == y.Type;  
    }
}
