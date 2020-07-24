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
        [HttpPost("adopt-topic")]
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        public async Task CreateAdoptTopicAsync([FromBody] AdoptTopicModel adoptTopicModel)
        {
            var data = _mapper.Map<AdoptTopicModel, AdoptTopicDto>(adoptTopicModel);
            await _configurationService.CreateAsync(data);
        }

        [HttpGet("adopt-topic")]
        [AllowAnonymous]
        [ProducesResponseType(typeof(ContentApiResponse<AdoptTopicModel>), 200)]
        [ProducesResponseType(typeof(string), 400)]
        [ProducesResponseType(404)]
        public async Task<ActionResult<AdoptTopicModel>> GetAdoptTopicAsync()
        {
            var modelDto = await _configurationService.GetAdoptTopicConfigurationAsync();

            return Item(_mapper.Map<AdoptTopicModel>(modelDto));
        }
    }
}
