using AnimalRescue.API.Core.Responses;
using AnimalRescue.API.Models.Configurations;
using AnimalRescue.Contracts.BusinessLogic.Models.Configurations;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using System.Threading.Tasks;

namespace AnimalRescue.API.Controllers
{
    public partial class ConfigurationsController
    {
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
            var modelDto = await _configurationService.GetLanguagesConfigurationAsync();

            return Item(_mapper.Map<LanguagesConfigModel>(modelDto));
        }
    }
}
