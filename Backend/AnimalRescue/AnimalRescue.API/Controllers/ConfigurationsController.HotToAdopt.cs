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
        [HttpPut("how-to-adopt")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task UpdateHowToAdoptAsync([FromBody] HowToAdoptModel model)
        {
            var data = _mapper.Map<HowToAdoptModel, HowToAdoptDto>(model);
            await _configurationService.UpdateAsync(data);
        }

        [HttpGet("how-to-adopt")]
        [AllowAnonymous]
        [ProducesResponseType(typeof(ContentApiResponse<HowToAdoptModel>), 200)]
        [ProducesResponseType(typeof(string), 400)]
        [ProducesResponseType(404)]
        public async Task<ActionResult<HowToAdoptModel>> GetHowToAdoptAsync()
        {
            var modelDto = await _configurationService.GetHowToAdoptConfigurationAsync();

            return Item(_mapper.Map<HowToAdoptModel>(modelDto));
        }
    }
}
