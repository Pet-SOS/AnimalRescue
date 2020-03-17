using AnimalRescue.API.Core.Responses;
using AnimalRescue.API.Models.FinancialReports;
using AnimalRescue.Contracts.BusinessLogic.Interfaces;
using AnimalRescue.Contracts.BusinessLogic.Models;
using AnimalRescue.Contracts.Common.Query;
using AnimalRescue.Infrastructure.Validation;

using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.Extensions.Logging;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AnimalRescue.API.Controllers
{
    /// <summary>
    /// Financial Reports API Management
    /// </summary>
    //[Authorize("Bearer")]
    public class FinancialReportController : ApiControllerBase
    {
        private readonly IFinancialReportService _financialReportService;

        private readonly IDocumentService _documentService;

        private readonly ILogger<FinancialReportController> _logger;

        private readonly IMapper _mapper;

        public FinancialReportController(
            IFinancialReportService financialReportService,
            IDocumentService documentService,
            ILogger<FinancialReportController> logger,
            IMapper mapper)
        {
            _financialReportService = financialReportService;
            _documentService = documentService;
            _logger = logger;
            _mapper = mapper;
        }

        [HttpGet("{id}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task<ActionResult<FinancialReportModel>> GetItemByIdAsync([BindRequired, FromRoute] Guid id)
        {
            return await GetItemAsync<FinancialReportDto, FinancialReportModel>(_financialReportService, id, _mapper);
        }

        [HttpGet]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task<ActionResult<CollectionSegmentApiResponse<FinancialReportModel>>> GetAsync([FromQuery]ApiQueryRequest queryRequest)
        {
            return await GetCollectionAsync<FinancialReportDto, FinancialReportModel>(_financialReportService, queryRequest, _mapper);
        }
        [HttpGet("years")]
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
            Require.Objects.NotNull(financialReportCreateModel.File, nameof(financialReportCreateModel.File));

            var fileIds = await _documentService.UploadFileAsync(
                new List<IFormFile>()
                {
                    financialReportCreateModel.File
                });

            var financialReportModel = _mapper.Map<FinancialReportCreateUpdateModel, FinancialReportModel>(financialReportCreateModel);
            financialReportModel.FileId = fileIds.First();

            return await CreatedItemAsync(_financialReportService, financialReportModel, _mapper);
        }

        [HttpPut("{id}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task UpdateAsync([BindRequired, FromRoute] Guid id, [FromForm] FinancialReportCreateUpdateModel financialReportUpdateModel)
        {
            Require.Objects.NotNull(financialReportUpdateModel.File, nameof(financialReportUpdateModel.File));

            var fileIds = await _documentService.UploadFileAsync(
                new List<IFormFile>()
                {
                    financialReportUpdateModel.File
                });

            var financialReportModel = _mapper.Map<FinancialReportCreateUpdateModel, FinancialReportModel>(financialReportUpdateModel);
            financialReportModel.Id = id;
            financialReportModel.FileId = fileIds.First();

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