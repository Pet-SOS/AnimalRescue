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
        [HttpPost("financialReportInfo")]
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        [ProducesResponseType(401)]
        public async Task CreateFinancialReportsInfoAsync([FromBody] FinancialReportsInfoModel financialReportsInfoModel)
        {
            var modelDto = _mapper.Map<FinancialReportsInfoModel, FinancialReportsInfoDto>(financialReportsInfoModel);
            await _configurationService.CreateAsync(modelDto);
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
