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
        [HttpPut("about-financial-reports")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task UpdateAboutFinancialReportsAsync([FromBody] AboutFinancialReportsModel model)
        {
            var data = _mapper.Map<AboutFinancialReportsModel, AboutFinancialReportsDto>(model);
            await _configurationService.UpdateAsync(data);
        }

        [HttpGet("about-financial-reports")]
        [AllowAnonymous]
        [ProducesResponseType(typeof(ContentApiResponse<AboutFinancialReportsModel>), 200)]
        [ProducesResponseType(typeof(string), 400)]
        [ProducesResponseType(404)]
        public async Task<ActionResult<AboutFinancialReportsModel>> GetAboutFinancialReportsAsync()
        {
            var modelDto = await _configurationService.GetAboutFinancialReportsConfigurationAsync();

            return Item(_mapper.Map<AboutFinancialReportsModel>(modelDto));
        }
    }
}
