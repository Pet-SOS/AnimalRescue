using AnimalRescue.BusinessLogic.Extensions;
using AnimalRescue.Contracts.BusinessLogic.Interfaces;
using AnimalRescue.Contracts.BusinessLogic.Models;
using AnimalRescue.Contracts.BusinessLogic.Models.Blogs;
using AnimalRescue.Contracts.Common.Constants;
using AnimalRescue.Contracts.Common.Query;
using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Models;
using AnimalRescue.Infrastructure.Validation;

using AutoMapper;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace AnimalRescue.BusinessLogic.Services
{
    internal class StoryService : IStoryService
    {
        private readonly IArticleRepository _storyRepository;
        private readonly IMapper _mapper;

        public StoryService(IArticleRepository storyRepository, IMapper mapper)
        {
            Require.Objects.NotNull(storyRepository, nameof(storyRepository));
            Require.Objects.NotNull(mapper, nameof(mapper));

            _storyRepository = storyRepository;
            _mapper = mapper;
        }

        public async Task<StoryDto> CreateAsync(StoryDto storyDto)
        {
            storyDto.Id = string.Empty;

            var story = _mapper.Map<StoryDto, Article>(storyDto);
            story = await _storyRepository.CreateAsync(story);
            storyDto = _mapper.Map<Article, StoryDto>(story);

            return storyDto;
        }

        public async Task<BlCollectonResponse<StoryDto>> GetAsync(ApiQueryRequest queryRequest)
        {
            var dbQuery = queryRequest.ToDbQuery();
            dbQuery.Filter += $"{PropertyConstants.Common.Type}~eq~'{PropertyConstants.EntityType.Story}'";
            var stories = await _storyRepository.GetAsync(dbQuery);
            var storyDtos = _mapper.Map<List<Article>, List<StoryDto>>(stories);
            var count = await _storyRepository.GetCountAsync(dbQuery);

            return new BlCollectonResponse<StoryDto>
            {
                Collection = storyDtos,
                TotalCount = count
            };
        }

        public async Task<StoryDto> GetAsync(string id)
        {
            var story = await _storyRepository.GetAsync(id);
            var storyDto = _mapper.Map<Article, StoryDto>(story);

            return storyDto;
        }

        public async Task UpdateAsync(StoryDto storyDto)
        {
            var story = _mapper.Map<StoryDto, Article>(storyDto);

            await _storyRepository.UpdateAsync(story);
        }

        public async Task DeleteAsync(string id)
        {
            await _storyRepository.DeleteAsync(id);
        }
    }
}
