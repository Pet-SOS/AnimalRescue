using AnimalRescue.API.Models.FinancialReports;
using AnimalRescue.Contracts.BusinessLogic.Interfaces;
using AnimalRescue.Contracts.BusinessLogic.Models;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AnimalRescue.API.Controllers
{
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
        public async Task<ActionResult<FinancialReportModel>> GetItemByIdAsync([FromRoute] string financialReportId)
        {
            return await GetItemAsync<FinancialReportDto, FinancialReportModel>(_financialReportService, financialReportId, _mapper);
        }

        [HttpPost]
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        public async Task<ActionResult<FinancialReportModel>> CreateItemAsync([FromForm] FinancialReportCreateModel financialReportCreateModel)
        {
            var fileIds = await _documentService.UploadFileAsync(
                new List<IFormFile>()
                {
                    financialReportCreateModel.File
                });

            var financialReportModel = _mapper.Map<FinancialReportCreateModel, FinancialReportModel>(financialReportCreateModel);

            if (fileIds?.Count > 0)
            {
                if (fileIds.Count != 1)
                {
                    // TODO throw an exception
                }

                financialReportModel.FileId = fileIds.Single();
            }

            return await CreatedItemAsync(_financialReportService, financialReportModel, _mapper);
        }

        [HttpPut]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task UpdateAsync([FromForm] FinancialReportUpdateModel financialReportUpdateModel)
        {
            var fileIds = await _documentService.UploadFileAsync(
                new List<IFormFile>()
                {
                    financialReportUpdateModel.File
                });

            var financialReportModel = _mapper.Map<FinancialReportUpdateModel, FinancialReportModel>(financialReportUpdateModel);
            financialReportModel.FileId = (await _financialReportService.GetAsync(financialReportModel.Id)).FileId;

            if (fileIds?.Count > 0)
            {
                if (fileIds.Count != 1)
                {
                    // TODO throw an exception
                }

                financialReportModel.FileId = fileIds.Single();
            }

            await UpdateDataAsync(_financialReportService, financialReportModel, _mapper);
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task DeleteAsync([FromRoute] string financialReportId)
        {
            await _financialReportService.DeleteAsync(financialReportId);
        }
    }
}