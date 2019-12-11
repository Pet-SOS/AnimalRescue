using AnimalRescue.Contracts;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;

namespace AnimalRescue.API.Controllers
{
    public class ConfigurationsController : ApiControllerBase
    {
        private readonly ILogger<ConfigurationsController> _logger;
        private readonly IConfigurationService _configurationService;

        public ConfigurationsController(ILogger<ConfigurationsController> logger, IConfigurationService configurationService)
        {
            _logger = logger;
            _configurationService = configurationService;
        }

        [HttpGet("cms")]
        public async Task<ActionResult<Models.CmsConfigurationModel>> CmsAsync()
        {
            using (_logger.BeginScope("Get Cms info"))
            {
                var modelDto = await _configurationService.GetCmsConfiguration();
                if (modelDto == null)
                {
                    return NotFound();
                }

                var modelApi = new Models.CmsConfigurationModel()
                {
                    Id = modelDto.Id,
                    Phones = modelDto.Phones,
                    SocialLinks = modelDto.SocialLinks
                };

                return Ok(modelApi);
            }
        }
    }
}
