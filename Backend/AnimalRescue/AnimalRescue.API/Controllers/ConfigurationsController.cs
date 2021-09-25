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
    [Authorize(Policy = "Bearer", Roles = "Admin")]
    public partial class ConfigurationsController : ApiControllerBase
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

        [HttpPut("donation")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task UpdateDonationAsync([FromBody] DonationConfigurationModel model)
        {
            var data = _mapper.Map<DonationConfigurationModel, DonationConfigurationDto>(model);
            await _configurationService.UpdateAsync(data);
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

        [HttpPut("cms")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task UpdateCmsAsync([FromBody] CmsConfigurationModel model)
        {
            var data = _mapper.Map<CmsConfigurationModel, CmsConfigurationDto>(model);
            await _configurationService.UpdateAsync(data);
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
