using AnimalRescue.API.Core.Responses;
using AnimalRescue.API.Models.Configurations;
using AnimalRescue.API.Models.Configurations.Contacts;
using AnimalRescue.API.Models.Configurations.Donations;
using AnimalRescue.API.Models.Configurations.Info;
using AnimalRescue.Contracts.BusinessLogic.Interfaces;
using AnimalRescue.Contracts.BusinessLogic.Models.Configurations;
using AnimalRescue.Contracts.BusinessLogic.Models.Configurations.Donations;
using AnimalRescue.Contracts.BusinessLogic.Models.Configurations.Info;
using AnimalRescue.Infrastructure.Validation;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using System.Threading.Tasks;

namespace AnimalRescue.API.Controllers
{
    //    [Authorize(Policy = "Bearer", Roles = "Admin")]
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


        [HttpPost("helpPopup")]
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        public async Task CreateHelpPopupAsync([FromBody] HelpPopupModel helpPopupModel)
        {
            var data = _mapper.Map<HelpPopupModel, HelpPopupDto >(helpPopupModel);
//            await _configurationService.CreateAsync(data);
        }

        [HttpGet("helpPopup")]
        [AllowAnonymous]
        [ProducesResponseType(typeof(ContentApiResponse<HelpPopupModel>), 200)]
        [ProducesResponseType(typeof(string), 400)]
        [ProducesResponseType(404)]
        public async Task<ActionResult<HelpPopupModel>> GetHelpPopupAsync()
        {
            var modelDto = await _configurationService.GetCmsConfigurationAsync();

            return Item(_mapper.Map<HelpPopupModel>(modelDto));
        }

        [HttpPost("HelpAdopt")]
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        public async Task CreateHelpAdoptAsync([FromBody] HelpAdoptModel helpAdoptModel)
        {
            var data = _mapper.Map<HelpAdoptModel, HelpAdoptDto>(helpAdoptModel);
            //            await _configurationService.CreateAsync(data);
        }

        [HttpGet("HelpAdopt")]
        [AllowAnonymous]
        [ProducesResponseType(typeof(ContentApiResponse<HelpAdoptModel>), 200)]
        [ProducesResponseType(typeof(string), 400)]
        [ProducesResponseType(404)]
        public async Task<ActionResult<HelpAdoptModel>> GetHelpAdoptAsync()
        {
            var modelDto = await _configurationService.GetCmsConfigurationAsync();

            return Item(_mapper.Map<HelpAdoptModel>(modelDto));
        }

        [HttpPost("getHomePopup")]
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        public async Task CreateHomePopupAsync([FromBody] GetHomePopupModel getHomePopupModel)
        {
            var data = _mapper.Map<GetHomePopupModel, GetHomePopupDto>(getHomePopupModel);
            await _configurationService.CreateAsync(data);
        }

        [HttpGet("getHomePopup")]
        [AllowAnonymous]
        [ProducesResponseType(typeof(ContentApiResponse<GetHomePopupModel>), 200)]
        [ProducesResponseType(typeof(string), 400)]
        [ProducesResponseType(404)]
        public async Task<ActionResult<GetHomePopupModel>> GetHomePopupAsync()
        {
            var modelDto = await _configurationService.GetHomePopupConfigurationAsync();
            return Item(_mapper.Map<GetHomePopupModel>(modelDto));
        }

        [HttpPost("languages")]
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        public async Task CreateLanguagesAsync([FromBody] LanguagesConfigModel languagesConfigModel)
        {
            var data = _mapper.Map<LanguagesConfigModel, LanguagesConfigDto>(languagesConfigModel);
            await _configurationService.CreateAsync(data);
        }

        [HttpGet("languages")]
        [AllowAnonymous]
        [ProducesResponseType(typeof(ContentApiResponse<LanguagesConfigModel>), 200)]
        [ProducesResponseType(typeof(string), 400)]
        [ProducesResponseType(404)]
        public async Task<ActionResult<LanguagesConfigModel>> GetLanguagesAsync()
        {
            var modelDto = await _configurationService.GetCmsConfigurationAsync();

            return Item(_mapper.Map<LanguagesConfigModel>(modelDto));
        }
    }
}
