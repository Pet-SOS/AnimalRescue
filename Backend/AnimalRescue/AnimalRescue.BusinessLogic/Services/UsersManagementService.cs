using AnimalRescue.BusinessLogic.Extensions;
using AnimalRescue.Contracts.BusinessLogic.Interfaces.UsersManagement;
using AnimalRescue.Contracts.BusinessLogic.Models.UsersManagement;
using AnimalRescue.Contracts.Common.Exceptions;
using AnimalRescue.DataAccess.Mongodb.Enums;
using AnimalRescue.DataAccess.Mongodb.Models;
using AnimalRescue.Infrastructure.Validation;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AnimalRescue.BusinessLogic.Services
{
    public class UsersManagementService : IUsersManagementService
    {
        private readonly UserManager<ApplicationUser> _userManager;


        public UsersManagementService(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        public async Task<UserUsersManagementViewItem> AddNew(AddNewUsersManagementViewModel model)
        {
            var identityUser = await _userManager.FindByEmailAsync(model.Email);
            Require.Objects.IfNull(identityUser, "User already exists");

            var newUser = new ApplicationUser
            {
                Email = model.Email,
                FirstName = model?.FirstName,
                LastName = model?.LastName,
                PhoneNumber = model?.PhoneNumber
            };

            var creationResult = await _userManager.CreateAsync(newUser);
            Require.Booleans.IsTrue<BadRequestException>(creationResult.Succeeded, creationResult.GetErrors());

            CheckRole(model.Roles);
            var assignRoleResult = await _userManager.AddToRolesAsync(newUser, model.Roles);
            Require.Booleans.IsTrue<BadRequestException>(assignRoleResult.Succeeded, assignRoleResult.GetErrors());

            var userRoles = await _userManager.GetRolesAsync(newUser);
            var userData = new UserUsersManagementViewItem
            {
                Id = newUser.Id,
                Email = newUser.Email,
                FirstName = newUser?.FirstName,
                LastName = newUser?.LastName,
                Roles = userRoles.ToList()
            };

            return userData;
        }


        public async Task GetList()
        {

        }

        #region Private

        private void CheckRole(string role)
        {
            var result = Enum.TryParse<UserRole>(role, out var checkedRole);
            Require.Booleans.IsTrue<ApplicationException>(result, $"Invalid role name: {role}");
        }

        private void CheckRole(IEnumerable<string> roles)
        {
            foreach (var role in roles.ToList())
            {
                CheckRole(role);
            }

        }

        #endregion
    }
}
