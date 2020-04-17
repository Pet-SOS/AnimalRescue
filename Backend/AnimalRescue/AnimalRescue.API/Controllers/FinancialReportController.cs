using AnimalRescue.API.Core.Responses;
using AnimalRescue.API.Models.FinancialReports;
using AnimalRescue.Contracts.BusinessLogic.Interfaces;
using AnimalRescue.Contracts.BusinessLogic.Models;
using AnimalRescue.Contracts.Common.Query;
using AnimalRescue.Infrastructure.Validation;

using AutoMapper;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;

using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AnimalRescue.API.Controllers
{
    /// <summary>
    /// Financial Reports API Management
    /// </summary>
    [Authorize("Bearer")]
    public class FinancialReportController : ApiControllerBase
    {
        private readonly IFinancialReportService _financialReportService;
        private readonly IDocumentService _documentService;
        private readonly IMapper _mapper;

        public FinancialReportController(
            IFinancialReportService financialReportService,
            IDocumentService documentService,
            IMapper mapper)
        {
            Require.Objects.NotNull(financialReportService, nameof(financialReportService));
            Require.Objects.NotNull(documentService, nameof(documentService));
            Require.Objects.NotNull(mapper, nameof(mapper));

            _financialReportService = financialReportService;
            _documentService = documentService;
            _mapper = mapper;
        }

        [HttpGet("{id}")]
        [AllowAnonymous]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task<ActionResult<FinancialReportModel>> GetItemByIdAsync([BindRequired, FromRoute] Guid id)
        {
            return await GetItemAsync<FinancialReportDto, FinancialReportModel, Guid>(_financialReportService, id, _mapper);
        }

        [HttpGet]
        [AllowAnonymous]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task<ActionResult<CollectionSegmentApiResponse<FinancialReportModel>>> GetAsync([FromQuery]ApiQueryRequest queryRequest)
        {
            return await GetCollectionAsync<FinancialReportDto, FinancialReportModel>(_financialReportService, queryRequest, _mapper);
        }
        [HttpGet("years")]
        [AllowAnonymous]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task<ActionResult<List<FinancialReportByYearDto>>> GetYearsAsync([FromQuery]ApiQueryRequest queryRequest)
        {
            return Item( await _financialReportService.GetReportsByYearsAsync());
        }

        [HttpPost]
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        public async Task<ActionResult<FinancialReportModel>> CreateItemAsync([FromForm] FinancialReportCreateUpdateModel financialReportCreateModel)
        {
            if(financialReportCreateModel is null)
            {
                return BadRequest();
            }

            var document = await _documentService.UploadFileAsync(financialReportCreateModel.File);

            var financialReportModel = _mapper.Map<FinancialReportCreateUpdateModel, FinancialReportModel>(financialReportCreateModel);
            financialReportModel.FileId = document.Id;

            return await CreatedItemAsync<FinancialReportDto, FinancialReportModel, Guid>(_financialReportService, financialReportModel, _mapper);
        }

        [HttpPut("{id}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task UpdateAsync([BindRequired, FromRoute] Guid id, [FromForm] FinancialReportCreateUpdateModel financialReportUpdateModel)
        {
            Require.Objects.NotNull(financialReportUpdateModel.File, nameof(financialReportUpdateModel.File));

            var document = await _documentService.UploadFileAsync(financialReportUpdateModel.File);

            var financialReportModel = _mapper.Map<FinancialReportCreateUpdateModel, FinancialReportModel>(financialReportUpdateModel);
            financialReportModel.Id = id;
            financialReportModel.FileId = document.Id;

            await UpdateDataAsync(_financialReportService, id, financialReportModel, _mapper);
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task DeleteAsync([BindRequired, FromRoute] Guid id)
        {
            await _financialReportService.DeleteAsync(id);
        }
    }
}