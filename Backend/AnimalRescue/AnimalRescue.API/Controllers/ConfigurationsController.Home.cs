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
        [HttpPut("home")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task UpdateHomeAsync([FromBody] HomeModel model)
        {
            var data = _mapper.Map<HomeModel, HomeDto>(model);
            await _configurationService.UpdateAsync(data);
        }

        [HttpGet("home")]
        [AllowAnonymous]
        [ProducesResponseType(typeof(ContentApiResponse<HomeModel>), 200)]
        [ProducesResponseType(typeof(string), 400)]
        [ProducesResponseType(404)]
        public async Task<ActionResult<HomeModel>> GetHomeAsync()
        {
            var modelDto = await _configurationService.GetHomeConfigurationAsync();

            return Item(_mapper.Map<HomeModel>(modelDto));
        }
    }
}
