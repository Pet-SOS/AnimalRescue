using AnimalRescue.Contracts.Responses;
using AnimalRescue.Contracts.Services;
using AnimalRescue.Models.DTO.Models;

using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

using System.Threading.Tasks;

namespace AnimalRescue.API.Controllers
{
    public class AnimalsController : ApiControllerBase
    {
        private readonly ILogger<AnimalsController> _logger;
        private readonly IAnimalService animalService;
        public AnimalsController(ILogger<AnimalsController> logger, IAnimalService animalService)
        {
            _logger = logger;
            this.animalService = animalService;
        }


        [HttpGet]
        public async Task<ActionResult<CollectionSegmentApiResponse<AnimalModel>>> GetAsync()
        {
            var data = await animalService.GetAnimalsAsync();

            return new CollectionSegmentApiResponse<AnimalModel>{ 
                Data = data,
                PageCount = 10,
                PageNumber = 10,
                PageSize = 10,
                TotalCount = 10,
                Self = "asdfasd"
            };
        }
    }
}
