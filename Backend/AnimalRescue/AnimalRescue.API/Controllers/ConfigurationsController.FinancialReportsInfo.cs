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
        [HttpPut("financialReportInfo")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task UpdateFinancialReportsInfoAsync([FromBody] FinancialReportsInfoModel model)
        {
            var data = _mapper.Map<FinancialReportsInfoModel, FinancialReportsInfoDto>(model);
            await _configurationService.UpdateAsync(data);
        }

        [HttpGet("financialReportInfo")]
        [AllowAnonymous]
        [ProducesResponseType(typeof(ContentApiResponse<FinancialReportsInfoModel>), 200)]
        [ProducesResponseType(typeof(string), 400)]
        [ProducesResponseType(404)]
        public async Task<ActionResult<FinancialReportsInfoModel>> GetFinancialReportsInfoAsync()
        {
            var modelDto = await _configurationService.GetFinancialReportsInfoConfigurationAsync();
            return Item(_mapper.Map<FinancialReportsInfoModel>(modelDto));
        }
    }
}
