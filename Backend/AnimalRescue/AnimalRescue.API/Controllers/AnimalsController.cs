using AnimalRescue.API.Core.Responses;
using AnimalRescue.API.Models;
using AnimalRescue.BusinessLogic.Interfaces;
using AnimalRescue.BusinessLogic.Models;
using AnimalRescue.Contracts.Common.Query;

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
        public readonly IMapper _mapper;

        public AnimalsController(ILogger<AnimalsController> logger, IMapper mapper, IAnimalService animalService)
        {
            _logger = logger;
            _mapper = mapper;
            this.animalService = animalService;
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

        [HttpPost]
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        public async Task<ActionResult<AnimalModel>> CreateItem([FromBody] AnimalModel animalModel)
        {
            return await CreatedItemAsync(animalService, animalModel, _mapper);
        }

        [HttpPut]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task UpdateAsync([FromBody] AnimalModel animalModel)
        {
            await UpdateDataAsync(animalService, animalModel, _mapper);
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
