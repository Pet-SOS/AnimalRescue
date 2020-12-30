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
        [HttpPut("about")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task UpdateAboutAsync([FromBody] AboutModel model)
        {
            var data = _mapper.Map<AboutModel, AboutDto>(model);
            await _configurationService.UpdateAsync(data);
        }

        [HttpGet("about")]
        [AllowAnonymous]
        [ProducesResponseType(typeof(ContentApiResponse<AboutModel>), 200)]
        [ProducesResponseType(typeof(string), 400)]
        [ProducesResponseType(404)]
        public async Task<ActionResult<AboutModel>> GetAboutAsync()
        {
            var modelDto = await _configurationService.GetAboutConfigurationAsync();

            return Item(_mapper.Map<AboutModel>(modelDto));
        }
    }
}
