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
        [HttpPut("how-to-help")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task UpdateHowToHelpAsync([FromBody] HowToHelpModel model)
        {
            var data = _mapper.Map<HowToHelpModel, HowToHelpDto>(model);
            await _configurationService.UpdateAsync(data);
        }

        [HttpGet("how-to-help")]
        [AllowAnonymous]
        [ProducesResponseType(typeof(ContentApiResponse<HowToHelpModel>), 200)]
        [ProducesResponseType(typeof(string), 400)]
        [ProducesResponseType(404)]
        public async Task<ActionResult<HowToHelpModel>> GetHowToHelpAsync()
        {
            var modelDto = await _configurationService.GetHowToHelpConfigurationAsync();

            return Item(_mapper.Map<HowToHelpModel>(modelDto));
        }
    }
}
