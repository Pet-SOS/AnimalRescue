using AnimalRescue.DataAccess.Mongodb.Enums;
using AnimalRescue.DataAccess.Mongodb.Migrations.Engine;
using AnimalRescue.DataAccess.Mongodb.Models;
using AnimalRescue.Infrastructure.Configuration;

using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;

using System;
using System.Linq;
using System.Threading.Tasks;

namespace AnimalRescue.DataAccess.Mongodb.Migrations
{
    [Migration("202003060152_AddDefaultUserAndAdminRoles")]
    internal class AddDefaultUserAndAdminRoles : IAnimalRescueMigration
    {
        private readonly RoleManager<ApplicationRole> _roleManager;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly AdminSettings _adminSettings;


        public AddDefaultUserAndAdminRoles(
            IOptions<AdminSettings> options,
            RoleManager<ApplicationRole> roleManager,
            UserManager<ApplicationUser> userManager)
        {
            _roleManager = roleManager;
            _userManager = userManager;
            _adminSettings = options.Value;
        }

        public async Task Execute()
        {
            var roleNames = Enum.GetValues(typeof(UserRole)).Cast<UserRole>().Select(x => x.ToString()).ToList();
            foreach (var roleName in roleNames)
            {
                var roleExist = await _roleManager.RoleExistsAsync(roleName);
                if (!roleExist)
                {
                    await _roleManager.CreateAsync(new ApplicationRole(roleName));
                }
            }

            var user = await _userManager.FindByEmailAsync(_adminSettings.Email);
            if (user == null)
            {
                var admin = new ApplicationUser
                {

                    UserName = _adminSettings.Email,
                    Email = _adminSettings.Email,
                    FirstName = "Super",
                    LastName = "User",
                    ProfilePhoto = null,
                    EmailConfirmed = true
                };

                var createPowerUser = await _userManager.CreateAsync(admin, _adminSettings.Password);
                if (createPowerUser.Succeeded)
                {
                    await _userManager.AddToRoleAsync(admin, UserRole.Admin.ToString());
                }
            }
        }
    }
}