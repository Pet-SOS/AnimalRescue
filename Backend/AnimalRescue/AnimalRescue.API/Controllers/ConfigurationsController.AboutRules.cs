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
        [HttpPut("about-rules")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task UpdateAboutRulesAsync([FromBody] AboutRulesModel model)
        {
            var data = _mapper.Map<AboutRulesModel, AboutRulesDto>(model);
            await _configurationService.UpdateAsync(data);
        }

        [HttpGet("about-rules")]
        [AllowAnonymous]
        [ProducesResponseType(typeof(ContentApiResponse<AboutRulesModel>), 200)]
        [ProducesResponseType(typeof(string), 400)]
        [ProducesResponseType(404)]
        public async Task<ActionResult<AboutRulesModel>> GetAboutRulesAsync()
        {
            var modelDto = await _configurationService.GetAboutRulesConfigurationAsync();

            return Item(_mapper.Map<AboutRulesModel>(modelDto));
        }
    }
}
