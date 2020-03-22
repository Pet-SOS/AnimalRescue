using AnimalRescue.API.Core.Extensions;
using AnimalRescue.API.Core.Responses;
using AnimalRescue.Contracts.BusinessLogic.Interfaces;
using AnimalRescue.Contracts.BusinessLogic.Models.Document;
using AnimalRescue.Contracts.Common.Query;
using AnimalRescue.Infrastructure.Validation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using System;
using System.Threading.Tasks;

namespace AnimalRescue.API.Controllers
{
    /// <summary>
    /// API for management of organization
    /// </summary>
    [Authorize("Bearer")]
    public class OrganizationController : ApiControllerBase
    {
        private readonly IDocumentService _documentService;
        private readonly IOrganizationDocumentService _organizationDocumentsService;

        public OrganizationController(IOrganizationDocumentService organizationDocumentsService, 
            IDocumentService documentService)
        {
            Require.Objects.NotNull(organizationDocumentsService, nameof(organizationDocumentsService));
            Require.Objects.NotNull(documentService, nameof(documentService));

            _organizationDocumentsService = organizationDocumentsService;
            _documentService = documentService;
        }

        /// <summary>
        /// Upload and save document of organization.
        /// </summary>
        /// <param name="file"></param>
        /// <returns>Uploaded document.</returns>
        [HttpPost("documents/upload")]
        [ProducesResponseType(typeof(ContentApiResponse<GetDocumentsOrganizationViewItem>), 201)]
        [ProducesResponseType(typeof(string), 400)]
        [ProducesResponseType(401)]
        public async Task<ActionResult<GetDocumentsOrganizationViewItem>> UploadDocument([BindRequired] IFormFile file)
        {
            var identityUser = User.Identity.GetUser();

            var documentModel = await _documentService.UploadFileAsync(file);

            var orgDocItem = await _organizationDocumentsService.CreateAsync(documentModel, identityUser.Id);

            return CreatedItem("Get", "Documents", new { id = orgDocItem.Id }, orgDocItem);
        }

        /// <summary>
        /// Gets documents of organization.
        /// </summary>
        /// <param name="queryRequest">Search parameters</param>
        /// <returns>Returns a collection of documents</returns>
        [HttpGet("documents")]
        [AllowAnonymous]
        [ProducesResponseType(typeof(CollectionSegmentApiResponse<GetDocumentsOrganizationViewItem>), 200)]
        [ProducesResponseType(typeof(string), 400)]
        [ProducesResponseType(404)]
        public async Task<ActionResult<CollectionSegmentApiResponse<GetDocumentsOrganizationViewItem>>>
            GetDocuments([FromQuery]ApiQueryRequest queryRequest)
        {
            var source = await _organizationDocumentsService.GetAsync(queryRequest);        

            return Collection(source.Collection, source.TotalCount, queryRequest.Page, queryRequest.Size);
        }

        /// <summary>
        /// Removes document of organization.
        /// </summary>
        /// <param name="bucketId">Id of a specific document in FS.</param>
        /// <returns></returns>
        [HttpDelete("documents/{bucketId}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> DeleteOrganizationDoc([FromRoute] Guid bucketId)
        {
            await _organizationDocumentsService.DeleteAsync(bucketId);

            return Ok();
        }
    }
}
