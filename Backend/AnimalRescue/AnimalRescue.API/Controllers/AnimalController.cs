using AnimalRescue.Contracts.Responses;
using AnimalRescue.Models.DTO.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AnimalRescue.API.Controllers
{
    public class AnimalController : ApiControllerBase
    {
        private readonly ILogger<HomeController> _logger;
        public AnimalController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<CollectionSegmentApiResponse<AnimalModel>>> Get()
        {

            return new CollectionSegmentApiResponse<AnimalModel>{ };
        }
    }
}
