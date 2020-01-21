using AnimalRescue.API.Models.Configurations.Contacts;
using AnimalRescue.API.Models.Configurations.Donations;
using AnimalRescue.Contracts.BusinessLogic.Interfaces;
using AnimalRescue.Contracts.BusinessLogic.Models.Configurations;
using AnimalRescue.Contracts.BusinessLogic.Models.Configurations.Donations;

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

        [HttpPost("donation")]
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        public async Task CreateDonationAsync([FromBody] DonationConfigurationModel configuration)
        {
            var data = _mapper.Map<DonationConfigurationModel, DonationConfigurationDto>(configuration);
            await _configurationService.CreateAsync(data);
        }

        [HttpGet("donation")]
        public async Task<ActionResult<DonationConfigurationModel>> GetDonationAsync()
        {
            var modelDto = await _configurationService.GetDonationConfigurationAsync();

            return Item(_mapper.Map<DonationConfigurationModel>(modelDto));
        }

        [HttpPost("cms")]
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        public async Task CreateCmsAsync([FromBody] CmsConfigurationModel cmsConfiguration)
        {
            var data = _mapper.Map<CmsConfigurationModel, CmsConfigurationDto>(cmsConfiguration);
            await _configurationService.CreateAsync(data);
        }

        [HttpGet("cms")]
        public async Task<ActionResult<CmsConfigurationModel>> GetCmsAsync()
        {
            var modelDto = await _configurationService.GetCmsConfigurationAsync();

            return Item(_mapper.Map<CmsConfigurationModel>(modelDto));
        }
    }
}
