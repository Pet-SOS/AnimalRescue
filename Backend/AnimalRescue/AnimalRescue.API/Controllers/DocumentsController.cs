using AnimalRescue.Contracts.Services;

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace AnimalRescue.API.Controllers
{
    public class DocumentsController : ApiControllerBase
    {
        private readonly IDocumentService documentService;
        public DocumentsController(IDocumentService documentService)
        {
            this.documentService = documentService;
        }

        [HttpPost]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)] 
        public async Task<ActionResult<List<string>>> UploadDocumentsAsync([FromForm]List<IFormFile> files)
        {
           var ids =  await documentService.UploadFilesAsync(files);

            return Item(ids);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> GetBytesAsync([FromRoute] string id)
        {
            var fileBytes = await documentService.GetFileBytesAsync(id);

            if (fileBytes == null)
            {
                return NotFound();
            }

            return File(fileBytes, "application/octet-stream"); ;
        } 
    }
}
