using AnimalRescue.API.Core.Responses;
using AnimalRescue.API.Models;
using AnimalRescue.BusinessLogic.Interfaces;
using AnimalRescue.BusinessLogic.Models;
using AnimalRescue.Infrastructure.Query;

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
            var data = await animalService.GetAsync(id);

            var result = _mapper.Map<AnimalModel>(data);

            return Item(result);
        }

        [HttpGet]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task<ActionResult<CollectionSegmentApiResponse<AnimalModel>>> GetAsync([FromQuery]ApiQueryRequest queryRequest)
        {
            var data = await animalService.GetAsync(queryRequest);

            var result = _mapper.Map<List<AnimalDto>, List<AnimalModel>>(data.collection);

            return Collection(result, data.totalCount, queryRequest.Page, queryRequest.Size);
        }

        [HttpPost]
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        public async Task<ActionResult<AnimalModel>> CreateItem([FromBody] AnimalModel animalModel)
        {
            var animalDto = _mapper.Map<AnimalDto>(animalModel);
            var data = await animalService.CreateAsync(animalDto);
            animalModel = _mapper.Map<AnimalDto, AnimalModel>(data);

            return CreatedItem(animalModel);
        }

        [HttpPut]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task UpdateAsync([FromBody] AnimalModel animalModel)
        {
            var animalDto = _mapper.Map<AnimalDto>(animalModel);
            await animalService.UpdateAsync(animalDto);
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
