using AnimalRescue.API.Core.Extensions;
using AnimalRescue.API.Core.Responses;
using AnimalRescue.Contracts.BusinessLogic.Interfaces.UsersManagement;
using AnimalRescue.Contracts.BusinessLogic.Models.UsersManagement;
using AnimalRescue.Contracts.Common.Query;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace AnimalRescue.API.Controllers
{
    [Authorize(Policy = "Bearer", Roles = "Admin")]
    public class UsersManagementController: ApiControllerBase
    {
        private readonly IUsersManagementService _usersManagementService;
        public UsersManagementController(IUsersManagementService usersManagementService)
        {
            _usersManagementService = usersManagementService;
        }

        /// <summary>
        /// Creates a new application user.
        /// </summary>
        /// <param name="model"><see cref="CreateUsersManagementViewModel"/></param>
        /// <returns>Created user model.</returns>
        [HttpPost]
        [ProducesResponseType(typeof(ContentApiResponse<GetUsersManagementViewModel>), 201)]
        [ProducesResponseType(typeof(string), 400)]
        [Route("create")]
        public async Task<ActionResult<GetUsersManagementViewModel>> CreateAsync([FromBody] CreateUsersManagementViewModel model)
        {
            var userModifier = User.Identity.GetUser();

            var result = await _usersManagementService.CreateAsync(userModifier.Id, model);

            return CreatedItem($"users/{result.UserId}", result);
        }

        /// <summary>
        /// Gets a list of users.
        /// </summary>
        /// <param name="queryParams"></param>
        /// <returns>By default returns a collection of users who are not deleted.</returns>
        [HttpGet]
        [ProducesResponseType(typeof(CollectionSegmentApiResponse<GetUsersManagementViewModel>), 200)]
        [ProducesResponseType(typeof(string), 400)]
        [Route("users")]
        public async Task<ActionResult<CollectionSegmentApiResponse<GetUsersManagementViewModel>>> GetAsync([FromQuery] ApiQueryRequest queryParams)
        {
            var source = await _usersManagementService.GetAsync(queryParams);

            return Collection(source.Collection, source.TotalCount, queryParams.Page, queryParams.Size);
        }

        /// <summary>
        /// Gets an active application user.
        /// </summary>
        /// <param name="id">Id of specific user.</param>
        /// <returns></returns>
        [HttpGet]
        [ProducesResponseType(typeof(ContentApiResponse<GetUsersManagementViewModel>), 200)]
        [ProducesResponseType(typeof(string), 400)]
        [ProducesResponseType(404)]
        [Route("users/{id}", Name = "GetUser")]
        public async Task<ActionResult<GetUsersManagementViewModel>> GetItemByIdAsync([FromRoute] Guid id)
        {
            var userModel = await _usersManagementService.GetAsync(id);

            return Item(userModel);
        }

        /// <summary>
        /// Updates user's information.
        /// </summary>
        /// <param name="id">Id of specific user</param>
        /// <param name="model">Params to update</param>
        /// <returns></returns>
        [HttpPut]
        [ProducesResponseType(200)]
        [ProducesResponseType(typeof(string), 400)]
        [ProducesResponseType(404)]
        [Route("users/{id}")]
        public async Task<ActionResult<GetUsersManagementViewModel>> EditAsync([FromRoute] Guid id, [FromBody] EditUsersManagementViewModel model)
        {
            var userModifier = User.Identity.GetUser();

            await _usersManagementService.UpdateOneAsync(id, userModifier.Id, model);

            return Ok();
        }

        /// <summary>
        /// Removes user.
        /// </summary>
        /// <param name="id">Id of specific user</param>
        /// <returns></returns>
        [HttpDelete]
        [ProducesResponseType(200)]
        [ProducesResponseType(typeof(string), 400)]
        [ProducesResponseType(404)]
        [Route("users/{id}")]
        public async Task<ActionResult<GetUsersManagementViewModel>> RemoveAsync([FromRoute] Guid id)
        {
            var userModifier = User.Identity.GetUser();

            await _usersManagementService.DeleteOneAsync(id, userModifier.Id);

            return Ok();
        }
    }
}
