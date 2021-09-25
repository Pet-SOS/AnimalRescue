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
        [HttpPut("adopt-popup")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task UpdateAdoptPopupAsync([FromBody] AdoptPopupModel model)
        {
            var data = _mapper.Map<AdoptPopupModel, AdoptPopupDto>(model);
            await _configurationService.UpdateAsync(data);
        }

        [HttpGet("adopt-popup")]
        [AllowAnonymous]
        [ProducesResponseType(typeof(ContentApiResponse<AdoptPopupModel>), 200)]
        [ProducesResponseType(typeof(string), 400)]
        [ProducesResponseType(404)]
        public async Task<ActionResult<AdoptPopupModel>> GetAdoptPopupAsync()
        {
            var modelDto = await _configurationService.GetAdoptPopupConfigurationAsync();

            return Item(_mapper.Map<AdoptPopupModel>(modelDto));
        }
    }
}
