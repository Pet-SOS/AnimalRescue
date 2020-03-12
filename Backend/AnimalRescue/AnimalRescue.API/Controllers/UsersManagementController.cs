using AnimalRescue.Contracts.BusinessLogic.Interfaces.UsersManagement;
using AnimalRescue.Contracts.BusinessLogic.Models.UsersManagement;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AnimalRescue.API.Controllers
{
    [Authorize(Policy = "Bearer", Roles = "Admin")]
    public class UsersManagementController: ApiControllerBase
    {
        private readonly IUsersManagementService _usersManagementService;
        public UsersManagementController(IBaseUsersManagementService usersManagementService)
        {
            _usersManagementService = usersManagementService as IUsersManagementService;
        }

        [HttpPost]
        [ProducesResponseType(typeof(UserUsersManagementViewItem), 201)]
        [ProducesResponseType(typeof(string), 400)]
        [Route("create")]
        public async Task<IActionResult> AddNew([FromBody] AddNewUsersManagementViewModel model)
        {
            var result = await _usersManagementService.AddNew(model);

            return Created($"usersManagements/users/{result.Id}", result);
        }

        [HttpGet]
        [ProducesResponseType(typeof(List<UserUsersManagementViewItem>), 201)]
        [ProducesResponseType(typeof(string), 400)]
        [Route("users")]
        public async Task<IActionResult> GetUsers()
        {

            return Ok();
        }

    }
}
