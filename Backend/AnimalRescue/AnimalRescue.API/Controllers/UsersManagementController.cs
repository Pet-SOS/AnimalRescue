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
        /// <param name="model"><see cref="CreateNewUsersManagementViewModel"/></param>
        /// <returns>Created user model.</returns>
        [HttpPost]
        [ProducesResponseType(typeof(ContentApiResponse<GetUserUsersManagementViewItem>), 201)]
        [ProducesResponseType(typeof(string), 400)]
        [Route("create")]
        public async Task<ActionResult<GetUserUsersManagementViewItem>> CreateNew([FromBody] CreateNewUsersManagementViewModel model)
        {
            var userModifier = User.Identity.GetUser();

            var result = await _usersManagementService.CreateNew(userModifier.Id, model);

            return CreatedItem($"users/{result.UserId}", result);
        }

        /// <summary>
        /// Gets list active users
        /// </summary>
        /// <param name="queryParams"></param>
        /// <returns>Returns a collection users who are not deleted.</returns>
        [HttpGet]
        [ProducesResponseType(typeof(CollectionSegmentApiResponse<GetUserUsersManagementViewItem>), 200)]
        [ProducesResponseType(typeof(string), 400)]
        [Route("users")]
        public async Task<ActionResult<CollectionSegmentApiResponse<GetUserUsersManagementViewItem>>> GetUsers([FromQuery] ApiQueryRequest queryParams)
        {
            var source = await _usersManagementService.GetActiveUsers(queryParams);

            return Collection(source.Collection, source.TotalCount, queryParams.Page, queryParams.Size);
        }

        /// <summary>
        /// Gets an active application user.
        /// </summary>
        /// <param name="id">Id of specific user.</param>
        /// <returns></returns>
        [HttpGet]
        [ProducesResponseType(typeof(ContentApiResponse<GetUserUsersManagementViewItem>), 200)]
        [ProducesResponseType(typeof(string), 400)]
        [ProducesResponseType(404)]
        [Route("users/{id}", Name = "GetUser")]
        public async Task<ActionResult<GetUserUsersManagementViewItem>> Get([FromRoute] Guid id)
        {
            var userModel = await _usersManagementService.GetUser(id);

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
        public async Task<ActionResult<GetUserUsersManagementViewItem>> Edit([FromRoute] Guid id, [FromBody] EditUsersManagementViewModel model)
        {
            var userModifier = User.Identity.GetUser();

            await _usersManagementService.UpdateOne(id, userModifier.Id, model);

            return Ok();
        }
    }
}
