using AnimalRescue.Contracts.Responses;
using AnimalRescue.Models.DTO.Models;

using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace AnimalRescue.API.Controllers
{
    public class AnimalsController : ApiControllerBase
    {
        private readonly ILogger<AnimalsController> _logger;
        public AnimalsController(ILogger<AnimalsController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<CollectionSegmentApiResponse<AnimalModel>>> GetAsync()
        { 
            return new CollectionSegmentApiResponse<AnimalModel>{ 
                Data = new List<AnimalModel>{ new AnimalModel { Age = 10, Description = "some" } } ,
                PageCount = 10,
                PageNumber = 10,
                PageSize = 10,
                TotalCount = 10,
                Self = "asdfasd"
            };
        }
    }
}
