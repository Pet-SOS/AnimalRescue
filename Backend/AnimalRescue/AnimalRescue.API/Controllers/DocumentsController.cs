using AnimalRescue.Contracts.BusinessLogic.Interfaces;

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;

using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AnimalRescue.Infrastructure.Validation;

namespace AnimalRescue.API.Controllers
{
    public class DocumentsController : ApiControllerBase
    {
        private readonly IDocumentService _documentService;

        public DocumentsController(IDocumentService documentService)
        {
            Require.Objects.NotNull(documentService, nameof(documentService));

            _documentService = documentService;
        }

        [HttpPost]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)] 
        public async Task<ActionResult<List<Guid>>> UploadDocumentsAsync([FromForm]List<IFormFile> files)
        {
           var ids =  await _documentService.UploadFileAsync(files);

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

            return File(fileBytes, "application/octet-stream"); ;
        } 
    }
}
