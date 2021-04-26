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
        [HttpPut("help-popup")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task UpdateHelpPopupAsync([FromBody] HelpPopupModel model)
        {
            var data = _mapper.Map<HelpPopupModel, HelpPopupDto>(model);
            await _configurationService.UpdateAsync(data);
        }

        [HttpGet("help-popup")]
        [AllowAnonymous]
        [ProducesResponseType(typeof(ContentApiResponse<HelpPopupModel>), 200)]
        [ProducesResponseType(typeof(string), 400)]
        [ProducesResponseType(404)]
        public async Task<ActionResult<HelpPopupModel>> GetHelpPopupAsync()
        {
            var modelDto = await _configurationService.GetHelpPopupConfigurationAsync();

            return Item(_mapper.Map<HelpPopupModel>(modelDto));
        }
    }
}
