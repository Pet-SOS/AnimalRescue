using AnimalRescue.API.Core.Responses;
using AnimalRescue.API.Models;
using AnimalRescue.Contracts.BusinessLogic.Interfaces;
using AnimalRescue.Contracts.BusinessLogic.Models;
using AnimalRescue.Contracts.Common.Query;
using AnimalRescue.Infrastructure.Validation;

using AutoMapper;

using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

using System.Threading.Tasks;

namespace AnimalRescue.API.Controllers
{
    public class StoriesController : ApiControllerBase
    {
        private readonly ILogger<AnimalsController> _logger;
        private readonly IStoryService _storyService;
        private readonly IDocumentService _documentService;
        public readonly IMapper _mapper;

        public StoriesController(
            ILogger<AnimalsController> logger, 
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
        public async Task<ActionResult<StoryModel>> GetItemByIdAsync([FromRoute] string id)
        {
            return await GetItemAsync<StoryDto, StoryModel>(_storyService, id, _mapper);
        }

        [HttpGet]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task<ActionResult<CollectionSegmentApiResponse<StoryModel>>> GetAsync([FromQuery]ApiQueryRequest queryRequest)
        {
            return await GetCollectionAsync<StoryDto, StoryModel>(_storyService, queryRequest, _mapper);
        }

        [HttpPost]
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        public async Task<ActionResult<StoryModel>> CreateItemAsync([FromForm] StoryCreateModel storyCreateModel)
        {
            var imageIds = await _documentService.UploadFileAsync(storyCreateModel.Images);

            StoryModel animalModel = _mapper.Map<StoryCreateModel, StoryModel>(storyCreateModel);

            if(imageIds?.Count > 0)
            {
                animalModel.ImageLinks = imageIds;
            }


            return await CreatedItemAsync(_storyService, animalModel, _mapper);
        }

        [HttpPut]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task UpdateAsync([FromForm] StoryUpdateModel storyUpdateModel)
        {
            var imageIds = await _documentService.UploadFileAsync(storyUpdateModel.Images);

            if (imageIds?.Count > 0)
            {
                storyUpdateModel.ImageLinks.AddRange(imageIds);
            }

            await UpdateDataAsync(_storyService, storyUpdateModel, _mapper);
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task DeleteAsync([FromRoute] string id)
        {
            await _storyService.DeleteAsync(id);
        }

    }
}
