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
        private readonly IOrganizationDocumentsService _organizationDocumentsService;

        public OrganizationController(IOrganizationDocumentsService organizationDocumentsService)
        {
            Require.Objects.NotNull(organizationDocumentsService, nameof(organizationDocumentsService));

            _organizationDocumentsService = organizationDocumentsService;
        }

        /// <summary>
        /// Upload and save document of organization.
        /// </summary>
        /// <param name="file"></param>
        /// <returns>Id of uploaded document.</returns>
        [HttpPost("documents/upload")]
        [ProducesResponseType(typeof(ContentApiResponse<Guid>), 201)]
        [ProducesResponseType(typeof(string), 400)]
        public async Task<ActionResult<Guid>> UploadDocument([BindRequired] IFormFile file)
        {
            var identityUser = User.Identity.GetUser();

            var uploadedModel = await _organizationDocumentsService.UploadFileAsync((file, identityUser.Id));

            await _organizationDocumentsService.CreateAsync(uploadedModel);

            return CreatedItem("Get", "Documents",
                new { id = uploadedModel.BucketId }, uploadedModel.BucketId);
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
