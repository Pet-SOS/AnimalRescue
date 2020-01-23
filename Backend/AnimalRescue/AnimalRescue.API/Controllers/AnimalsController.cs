using AnimalRescue.API.Core.Responses;
using AnimalRescue.API.Models.Animals;
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
    public class AnimalsController : ApiControllerBase
    {
        private readonly ILogger<AnimalsController> _logger;
        private readonly IAnimalService animalService;
        private readonly IDocumentService documentService;
        public readonly IMapper _mapper;

        public AnimalsController(
            ILogger<AnimalsController> logger, 
            IMapper mapper, 
            IAnimalService animalService,
            IDocumentService documentService)
        {
            Require.Objects.NotNull(logger, nameof(logger));
            Require.Objects.NotNull(mapper, nameof(mapper));
            Require.Objects.NotNull(animalService, nameof(animalService));
            Require.Objects.NotNull(documentService, nameof(documentService));

            _logger = logger;
            _mapper = mapper;
            this.animalService = animalService;
            this.documentService = documentService;
        }

        [HttpGet("{id}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task<ActionResult<AnimalModel>> GetItemByIdAsync([FromRoute] string id)
        {
            return await GetItemAsync<AnimalDto, AnimalModel>(animalService, id, _mapper);
        }

        [HttpGet]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task<ActionResult<CollectionSegmentApiResponse<AnimalModel>>> GetAsync([FromQuery]ApiQueryRequest queryRequest)
        {
            return await GetCollectionAsync<AnimalDto, AnimalModel>(animalService, queryRequest, _mapper);
        }

        [HttpGet("Counter")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task<ActionResult<int>> GetCountAsync()
        {
            return  Item(await animalService.GetCountAsync(new ApiQueryRequest()));
        }

        [HttpPost]
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        public async Task<ActionResult<AnimalModel>> CreateItemAsync([FromForm] AnimalCreateUpdateModel animalCreateModel)
        {
            var imageIds = await documentService.UploadFileAsync(animalCreateModel.Images);
            
            AnimalModel animalModel = _mapper.Map<AnimalCreateUpdateModel, AnimalModel>(animalCreateModel);

            if(imageIds?.Count > 0)
            {
                animalModel.ImageIds = imageIds;
            }


            return await CreatedItemAsync(animalService, animalModel, _mapper);
        }

        [HttpPut("{id}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task UpdateAsync([FromRoute] string id, [FromForm] AnimalCreateUpdateModel animalUpdateModel)
        {
            var imageIds = await documentService.UploadFileAsync(animalUpdateModel.Images);

            AnimalModel animalModel = _mapper.Map<AnimalCreateUpdateModel, AnimalModel>(animalUpdateModel);
            animalModel.Id = id;
            animalModel.ImageIds = (await animalService.GetAsync(animalModel.Id)).ImageIds;

            if (imageIds?.Count > 0)
            {
                animalModel.ImageIds.AddRange(imageIds);
            } 

            await UpdateDataAsync(animalService, id, animalModel, _mapper);
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task DeleteAsync([FromRoute] string id)
        {
            await animalService.DeleteAsync(id);
        }
    }
}
