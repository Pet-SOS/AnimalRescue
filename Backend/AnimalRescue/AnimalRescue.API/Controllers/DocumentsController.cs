using AnimalRescue.Contracts.BusinessLogic.Interfaces;
using AnimalRescue.Infrastructure.Validation;

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;

using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AnimalRescue.API.Controllers
{
    public class DocumentsController : ApiControllerBase
    {
        private readonly IDocumentService _documentService;
        private readonly IDocumentCollectionService _documentCollectionService;

        public DocumentsController(
            IDocumentService documentService,
            IDocumentCollectionService documentCollectionService)
        {
            Require.Objects.NotNull(documentService, nameof(documentService));

            _documentService = documentService;
            _documentCollectionService = documentCollectionService;
        }

        [HttpPost]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        public async Task<ActionResult<List<Guid>>> UploadDocumentsAsync([FromForm]List<IFormFile> files)
        {
            var ids = await _documentService.UploadFileAsync(files);

            return Item(ids);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> GetBytesAsync([BindRequired, FromRoute] Guid id)
        {
            var fileBytes = await _documentService.GetAsync(id);

            if (fileBytes == null)
            {
                return NotFound();
            }

            return File(fileBytes.Data, fileBytes?.ContentType ?? System.Net.Mime.MediaTypeNames.Application.Octet);
        }
        [HttpGet("{id}/type/{name}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> GetBytesAsync(
            [BindRequired, FromRoute] Guid id, 
            [BindRequired, FromRoute] string name)
        {
            var documentId = await _documentCollectionService.GetAsync(id, name);
            if (documentId == null)
            {
                return NotFound();
            }

            var fileBytes = await _documentService
                .GetAsync((Guid)documentId);

            if (fileBytes == null)
            {
                return NotFound();
            }

            return File(fileBytes.Data, fileBytes?.ContentType ?? System.Net.Mime.MediaTypeNames.Application.Octet);
        }
    }
}
