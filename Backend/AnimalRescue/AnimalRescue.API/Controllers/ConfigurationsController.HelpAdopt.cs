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
        [HttpPost("help-adopt")]
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        public async Task CreateHelpAdoptAsync([FromBody] HelpAdoptModel helpAdoptModel)
        {
            var data = _mapper.Map<HelpAdoptModel, HelpAdoptDto>(helpAdoptModel);
            await _configurationService.CreateAsync(data);
        }

        [HttpGet("help-adopt")]
        [AllowAnonymous]
        [ProducesResponseType(typeof(ContentApiResponse<HelpAdoptModel>), 200)]
        [ProducesResponseType(typeof(string), 400)]
        [ProducesResponseType(404)]
        public async Task<ActionResult<HelpAdoptModel>> GetHelpAdoptAsync()
        {
            var modelDto = await _configurationService.GetHelpAdoptConfigurationAsync();

            return Item(_mapper.Map<HelpAdoptModel>(modelDto));
        }
    }
}
