using AnimalRescue.Contracts;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;

namespace AnimalRescue.API.Controllers
{
    public class ConfigurationsController : ApiControllerBase
    {
        private readonly IMapper _mapper;
        private readonly ILogger<ConfigurationsController> _logger;
        private readonly IConfigurationService _configurationService;

        public ConfigurationsController(ILogger<ConfigurationsController> logger, IConfigurationService configurationService, IMapper mapper)
        {
            _logger = logger;
            _configurationService = configurationService;
            _mapper = mapper;
        }

        [HttpGet("cms")]
        public async Task<ActionResult<Models.CmsConfigurationModel>> CmsAsync()
        {
            using (_logger.BeginScope("Get Cms configuration"))
            {
                var modelDto = await _configurationService.GetCmsConfiguration();
                if (modelDto == null)
                {
                    _logger.LogError($"Cms configuration could not be found");

                    return NotFound();
                }

                return Ok(_mapper.Map<Models.CmsConfigurationModel>(modelDto));
            }
        }
    }
}
