using System;
using System.Threading.Tasks;
using AnimalRescue.API.Models.FinancialReportYearInfo;
using AnimalRescue.Contracts.BusinessLogic.Interfaces;
using AnimalRescue.Contracts.BusinessLogic.Models;
using AnimalRescue.Infrastructure.Validation;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace AnimalRescue.API.Controllers
{
    [Authorize("Bearer")]
    public class FinancialReportYearInfoController : ApiControllerBase
    {
        private readonly IFinancialReportYearInfoService _financialReportYearInfoService;
        private readonly IMapper _mapper;
        public FinancialReportYearInfoController(IFinancialReportYearInfoService financialReportYearInfoService, IMapper mapper)
        {
            Require.Objects.NotNull(financialReportYearInfoService, nameof(financialReportYearInfoService));
            Require.Objects.NotNull(mapper, nameof(mapper));

            _financialReportYearInfoService = financialReportYearInfoService;
            _mapper = mapper;
        }

        [HttpGet("{year}")]
        [AllowAnonymous]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task<ActionResult<FinancialReportYearInfoModel>> GetInfoByYear(int year)
        {
            var data = await _financialReportYearInfoService.GetFinancialReportInfoByYear(year);
            return Item(_mapper.Map <FinancialReportYearInfoDto, FinancialReportYearInfoModel>(data));
        }

        [HttpPost]
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        [ProducesResponseType(401)]
        [ProducesResponseType(500)]
        public async Task CreateItemAsync([FromBody] FinancialReportYearInfoModel financialReportYearInfoModel)
        {
            var modelDto = _mapper.Map<FinancialReportYearInfoModel, FinancialReportYearInfoDto>(financialReportYearInfoModel);
            await _financialReportYearInfoService.CreateAsync(modelDto);
        }

        [HttpPut("{id}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(401)]
        [ProducesResponseType(404)]
        [ProducesResponseType(500)]
        public async Task UpdateItemAsync([BindRequired, FromRoute] Guid id, [FromBody] FinancialReportYearInfoModel financialReportYearInfo)
        {
            await UpdateDataAsync(_financialReportYearInfoService, id, financialReportYearInfo, _mapper);
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(401)]
        [ProducesResponseType(404)]
        [ProducesResponseType(500)]
        public async Task DeleteAsync([BindRequired, FromRoute] Guid id)
        {
            await _financialReportYearInfoService.DeleteAsync(id);
        }
    }
}