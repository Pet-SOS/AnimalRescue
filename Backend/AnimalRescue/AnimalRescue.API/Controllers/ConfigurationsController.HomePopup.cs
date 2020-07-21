using AnimalRescue.API.Core.Responses;
using AnimalRescue.API.Models.Configurations.Info;
using AnimalRescue.Contracts.BusinessLogic.Models.Configurations.Info;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using System.Threading.Tasks;

namespace AnimalRescue.API.Controllers
{
    public partial class ConfigurationsController
    {
        [HttpPost("home-popup")]
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        public async Task CreateHomePopupAsync([FromBody] HomePopupModel getHomePopupModel)
        {
            var data = _mapper.Map<HomePopupModel, HomePopupDto>(getHomePopupModel);
            await _configurationService.CreateAsync(data);
        }

        [HttpGet("home-popup")]
        [AllowAnonymous]
        [ProducesResponseType(typeof(ContentApiResponse<HomePopupModel>), 200)]
        [ProducesResponseType(typeof(string), 400)]
        [ProducesResponseType(404)]
        public async Task<ActionResult<HomePopupModel>> GetHomePopupAsync()
        {
            var modelDto = await _configurationService.GetHomePopupConfigurationAsync();
            return Item(_mapper.Map<HomePopupModel>(modelDto));
        }
    }
}
