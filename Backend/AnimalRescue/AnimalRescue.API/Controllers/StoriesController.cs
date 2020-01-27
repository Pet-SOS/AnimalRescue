using AnimalRescue.API.Core.Responses;
using AnimalRescue.API.Models.Blogs.Stories;
using AnimalRescue.Contracts.BusinessLogic.Interfaces;
using AnimalRescue.Contracts.BusinessLogic.Models.Blogs;
using AnimalRescue.Contracts.Common.Query;
using AnimalRescue.Infrastructure.Validation;

using AutoMapper;

using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.Extensions.Logging;

using System;
using System.Threading.Tasks;

namespace AnimalRescue.API.Controllers
{
    public class StoriesController : ApiControllerBase
    {
        private readonly ILogger<StoriesController> _logger;
        private readonly IStoryService _storyService;
        private readonly IDocumentService _documentService;
        public readonly IMapper _mapper;

        public StoriesController(
            ILogger<StoriesController> logger,
            IMapper mapper,
            IStoryService storyService,
            IDocumentService documentService)
        {
            Require.Objects.NotNull(logger, nameof(logger));
            Require.Objects.NotNull(mapper, nameof(mapper));
            Require.Objects.NotNull(storyService, nameof(storyService));
            Require.Objects.NotNull(documentService, nameof(documentService));

            _logger = logger;
            _mapper = mapper;
            _storyService = storyService;
            _documentService = documentService;
        }

        [HttpGet("{id}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task<ActionResult<StoryInfoModel>> GetItemByIdAsync([BindRequired, FromRoute] Guid id)
        {
            //Require.Strings.NotNullOrWhiteSpace(id, nameof(id));

            return await GetItemAsync<StoryDto, StoryInfoModel>(_storyService, id, _mapper);
        }

        [HttpGet]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task<ActionResult<CollectionSegmentApiResponse<StoryInfoModel>>> GetAsync([FromQuery]ApiQueryRequest queryRequest)
        {
            return await GetCollectionAsync<StoryDto, StoryInfoModel>(_storyService, queryRequest, _mapper);
        }

        [HttpPost]
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        public async Task<ActionResult<StoryInfoModel>> CreateItemAsync([FromForm] StoryCreateModel storyCreateModel)
        {
            return await CreatedItemAsync<StoryDto,StoryCreateModel,StoryInfoModel>(_storyService, _documentService, storyCreateModel, storyCreateModel.Images, _mapper);
        }

        [HttpPut("{id}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task UpdateAsync([BindRequired, FromRoute] Guid id, [FromForm] StoryUpdateModel storyUpdateModel)
        {
            await UpdateDataAsync(_storyService, _documentService, id, storyUpdateModel, storyUpdateModel.Images, _mapper);
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task DeleteAsync([BindRequired, FromRoute] Guid id)
        {
            await _storyService.DeleteAsync(id);
        } 
    }
}
