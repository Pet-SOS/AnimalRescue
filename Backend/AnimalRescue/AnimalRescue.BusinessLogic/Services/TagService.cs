using AnimalRescue.BusinessLogic.Extensions;
using AnimalRescue.Contracts.BusinessLogic.Interfaces;
using AnimalRescue.Contracts.BusinessLogic.Models;
using AnimalRescue.Contracts.BusinessLogic.Models.Blogs;
using AnimalRescue.Contracts.Common.Query;
using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Models;
using AutoMapper;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AnimalRescue.BusinessLogic.Services
{
    internal class TagService: ITagService
    {
        private readonly ITagRepository _tagRepository;

        private readonly IMapper mapper;

        public TagService(ITagRepository tagRepository, IMapper mapper)
        {
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

        public async Task<TagDto> GetAsync(string query)
        {
            var tag = await _tagRepository.GetAsync(query);
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

        public async Task UpdateAsync(TagDto tagDto)
        {
            var tag = mapper.Map<TagDto, Tags>(tagDto);

            await _tagRepository.UpdateAsync(tag);
        }

        public async Task DeleteAsync(string id)
        {
            await _tagRepository.DeleteAsync(id);
        }
    }
}
