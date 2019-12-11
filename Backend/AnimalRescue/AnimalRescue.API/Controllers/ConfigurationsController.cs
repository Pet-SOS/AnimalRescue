using AnimalRescue.Models.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AnimalRescue.API.Controllers
{
    public class ConfigurationsController : ApiControllerBase
    {
        private readonly ILogger<ConfigurationsController> _logger;

        public ConfigurationsController(ILogger<ConfigurationsController> logger)
        {
            _logger = logger;
        }

        [HttpGet("cms")]
        public async Task<ActionResult<CmsModel>> CmsAsync()
        {
            using (_logger.BeginScope("Get Cms info"))
            {
                return Ok(new CmsModel()
                {
                    Phones = new List<string> { "(095)42-41-478", "(068)42-41-478" },
                    SocialLinks = new Dictionary<string, string>() {
                    { "Facebook", "https://www.facebook.com/" },
                    { "Instagram", "https://www.instagram.com/" },
                    { "Twitter", "https://twitter.com" } }
                });
            }
        }
    }
}
