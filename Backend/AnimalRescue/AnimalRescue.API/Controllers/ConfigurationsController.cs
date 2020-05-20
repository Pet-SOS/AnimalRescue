using AnimalRescue.API.Core.Responses;
using AnimalRescue.API.Models.Configurations.Contacts;
using AnimalRescue.API.Models.Configurations.Donations;
using AnimalRescue.Contracts.BusinessLogic.Interfaces;
using AnimalRescue.Contracts.BusinessLogic.Models.Configurations;
using AnimalRescue.Contracts.BusinessLogic.Models.Configurations.Donations;
using AnimalRescue.Infrastructure.Validation;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using System.Threading.Tasks;

namespace AnimalRescue.API.Controllers
{
    //[Authorize(Policy = "Bearer", Roles = "Admin")]
    [Authorize("Bearer")]
    public class ConfigurationsController : ApiControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IConfigurationService _configurationService;

        public ConfigurationsController(IConfigurationService configurationService, IMapper mapper)
        {
            Require.Objects.NotNull(mapper, nameof(mapper));
            Require.Objects.NotNull(configurationService, nameof(configurationService));

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
        [AllowAnonymous]
        [ProducesResponseType(typeof(ContentApiResponse<DonationConfigurationModel>), 200)]
        [ProducesResponseType(typeof(string), 400)]
        [ProducesResponseType(404)]
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
        [AllowAnonymous]
        [ProducesResponseType(typeof(ContentApiResponse<CmsConfigurationModel>), 200)]
        [ProducesResponseType(typeof(string), 400)]
        [ProducesResponseType(404)]
        public async Task<ActionResult<CmsConfigurationModel>> GetCmsAsync()
        {
            var modelDto = await _configurationService.GetCmsConfigurationAsync();

            return Item(_mapper.Map<CmsConfigurationModel>(modelDto));
        }
    }
}
