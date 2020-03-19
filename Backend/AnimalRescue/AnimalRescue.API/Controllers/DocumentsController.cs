using AnimalRescue.API.Core.Extensions;
using AnimalRescue.API.Core.Responses;
using AnimalRescue.API.Models;
using AnimalRescue.Contracts.BusinessLogic.Interfaces;
using AnimalRescue.Contracts.BusinessLogic.Models.Document;
using AnimalRescue.Contracts.Common.Query;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;

using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AnimalRescue.API.Controllers
{
    /// <summary>
    /// API documents management
    /// </summary>
    [Authorize("Bearer")]
    public class DocumentsController : ApiControllerBase
    {
        private readonly IDocumentService _documentService;
        private readonly IDocumentCollectionService _documentCollectionService;

        public DocumentsController(IDocumentService documentService,
            IDocumentCollectionService documentCollectionService)
        {
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

        /// <summary>
        /// Downloads a document.
        /// </summary>
        /// <param name="id">Id of a specific document</param>
        /// <returns></returns>
        [HttpGet("{id}")]
        [AllowAnonymous]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> Get([BindRequired, FromRoute] Guid id)
        {
            var fileBytes = await _documentService.GetAsync(id);

            if (fileBytes == null)
            {
                return NotFound();
            }

            return File(fileBytes.Data, fileBytes?.ContentType ?? System.Net.Mime.MediaTypeNames.Application.Octet);
        }

        [HttpGet("{id}/type/{name}")]
        [AllowAnonymous]
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

        /// <summary>
        /// Upload and save document of organization.
        /// </summary>
        /// <param name="file"></param>
        /// <returns>Id of uploaded document.</returns>
        [HttpPost("upload/organization")]
        [ProducesResponseType(typeof(ContentApiResponse<BaseModel>), 201)]
        [ProducesResponseType(typeof(string), 400)]
        public async Task<ActionResult<BaseModel>> UploadOrganizationDocument(IFormFile file)
        {
            var identityUser = User.Identity.GetUser();

            var uploadedModel = await _documentService.UploadFileAsync((file, identityUser.Id));

            await _documentService.CreateAsync(uploadedModel);

            return CreatedItem(new BaseModel { Id = uploadedModel.BucketId });
        }

        /// <summary>
        /// Gets documents of organization.
        /// </summary>
        /// <param name="queryRequest">Search parameters</param>
        /// <returns>Returns a collection of documents</returns>
        [HttpGet("list/organization")]
        [AllowAnonymous]
        [ProducesResponseType(typeof(CollectionSegmentApiResponse<GetOrganizationDocsDocumentViewItem>), 200)]
        [ProducesResponseType(typeof(string), 400)]
        [ProducesResponseType(404)]
        public async Task<ActionResult<CollectionSegmentApiResponse<GetOrganizationDocsDocumentViewItem>>>
            GetOrganizationDocs([FromQuery]ApiQueryRequest queryRequest)
        {
            var source = await _documentService.GetAsync(queryRequest);

            return Collection(source.Collection, source.TotalCount, queryRequest.Page, queryRequest.Size);
        }

        /// <summary>
        /// Removes document of organization.
        /// </summary>
        /// <param name="id">Id of a specific document in FS.</param>
        /// <returns></returns>
        [HttpDelete("{id}/organization")]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> DeleteOrganizationDoc([FromRoute] Guid id)
        {
            await _documentService.DeleteAsync(id);

            return Ok();
        }
    }
}
