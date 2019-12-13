using AnimalRescue.API.Models;
using AnimalRescue.Contracts.Responses;
using AnimalRescue.Contracts.Services;
using AnimalRescue.Models.DTO.Models;

using AutoMapper;

using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

using System.Collections.Generic;
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
            var data = await animalService.GetAnimalAsync(id);

            var result = _mapper.Map<AnimalModel>(data);

            return Item(result);
        }

        [HttpGet]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task<ActionResult<CollectionSegmentApiResponse<AnimalModel>>> GetAsync()
        {
            var data = await animalService.GetAnimalsAsync();

            var result = _mapper.Map<List<AnimalDto>,List<AnimalModel>>(data);

            return Collection(result, 100, 1, 10); ;
        }

        [HttpPost]
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        public async Task<ActionResult<AnimalModel>> CreateItem([FromBody] AnimalModel animal)
        {
            var animalDto = _mapper.Map<AnimalDto>(animal);
            var data = await animalService.CreateAnimalAsync(animalDto);
            animal = _mapper.Map<AnimalDto, AnimalModel>(data);

            return CreatedItem(animal);
        }      
    }
}
