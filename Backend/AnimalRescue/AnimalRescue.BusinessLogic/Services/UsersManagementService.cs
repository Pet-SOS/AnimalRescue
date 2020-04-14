using AnimalRescue.BusinessLogic.Extensions;
using AnimalRescue.Contracts.BusinessLogic.Interfaces.UsersManagement;
using AnimalRescue.Contracts.BusinessLogic.Models;
using AnimalRescue.Contracts.BusinessLogic.Models.UsersManagement;
using AnimalRescue.Contracts.BusinessLogic.Services;
using AnimalRescue.Contracts.Common.Exceptions;
using AnimalRescue.Contracts.Common.Query;
using AnimalRescue.DataAccess.Mongodb.Enums;
using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Models;
using AnimalRescue.Infrastructure.Helpers;
using AnimalRescue.Infrastructure.Validation;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using MongoDB.Driver;
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
        private readonly IMapper _mapper;
        private readonly IUserRepository _userRepository;
        private readonly IEmailSender _emailSender;

        public UsersManagementService(UserManager<ApplicationUser> userManager,
            IMapper mapper,
            IUserRepository userRepository,
            IEmailSender emailSender)
        {
            Require.Objects.NotNull(emailSender, nameof(userManager));
            Require.Objects.NotNull(emailSender, nameof(mapper));
            Require.Objects.NotNull(emailSender, nameof(userRepository));
            Require.Objects.NotNull(emailSender, nameof(emailSender));

            _userManager = userManager;
            _mapper = mapper;
            _userRepository = userRepository;
            _emailSender = emailSender;
        }

        public virtual async Task<GetUsersManagementViewModel> CreateAsync(Guid modifierUserId, CreateUsersManagementViewModel model)
        {
            var identityUser = await _userManager.FindByEmailAsync(model.Email);
            Require.Objects.ShouldBeNull(identityUser, "User already exists");

            var newUser = new ApplicationUser()
            {
                Email = model.Email,
                UserName = model.Email,
                FirstName = model.FirstName,
                LastName = model.LastName,
                PhoneNumber = model.PhoneNumber,
                PhoneNumberConfirmed = !string.IsNullOrEmpty(model.PhoneNumber),
                LastPasswordChange = DateHelper.GetUtc(),
                CreatedBy = modifierUserId.ToString(),
                EmailConfirmed = true
            };

            var password = PasswordHelper.GeneratePassword(8);
            var creationResult = await _userManager.CreateAsync(newUser, password);
            Require.Booleans.IsTrue<BadRequestException>(creationResult.Succeeded, creationResult.GetErrors);

            CheckRole(model.Roles);
            var assignRoleResult = await _userManager.AddToRolesAsync(newUser, model.Roles);
            Require.Booleans.IsTrue<BadRequestException>(assignRoleResult.Succeeded, assignRoleResult.GetErrors);

            SendInvitationWithPassword(newUser, password);

            var userData = _mapper.Map<GetUsersManagementViewModel>(newUser);

            return userData;
        }

        public virtual async Task<BlCollectonResponse<GetUsersManagementViewModel>> GetAsync(ApiQueryRequest queryRequest)
        {
            var dbQuery = queryRequest.ToDbQuery();

            var users = await _userRepository.GetAsync(dbQuery);
            var totalNumberOf = await _userRepository.GetCountAsync(dbQuery);

            var userCollection = _mapper.Map<IEnumerable<ApplicationUser>, List<GetUsersManagementViewModel>>(users);
            foreach (var userModel in userCollection)
            {
                var identityUser = users.SingleOrDefault(x => x.Id == userModel.UserId);
                userModel.Roles.AddRange(await _userManager.GetRolesAsync(identityUser));
            }

            return new BlCollectonResponse<GetUsersManagementViewModel>
            { Collection = userCollection, TotalCount = totalNumberOf };
        }

        public virtual async Task<GetUsersManagementViewModel> GetAsync(Guid userId)
        {
            var user = FindOne(userId);

            var result = _mapper.Map<GetUsersManagementViewModel>(user);
            result.Roles.AddRange(await _userManager.GetRolesAsync(user));

            return result;
        }

        public virtual async Task UpdateOneAsync(Guid userId, Guid modifierUserId, EditUsersManagementViewModel model)
        {
            ApplicationUser user = FindOne(userId);

            var isUsernameChanged = user.Email != model.Email;
            if (isUsernameChanged)
            {
                var userByNewEmail = _userManager.Users.SingleOrDefault(x => x.Email == model.Email && !x.IsDeleted);
                Require.Objects.ShouldBeNull<BadRequestException>(userByNewEmail, $"User with email {model.Email} already exists.");

                user.Email = model.Email;
                user.UserName = model.Email;
            }

            user.FirstName = model.FirstName;
            user.LastName = model.LastName;
            user.PhoneNumber = model.PhoneNumber;
            user.ModifiedAt = DateHelper.GetUtc();
            user.ModifiedBy = modifierUserId.ToString();

            var updateResult = await _userManager.UpdateAsync(user);
            Require.Booleans.IsTrue<BadRequestException>(updateResult.Succeeded, updateResult.GetErrors);

            await ReAssignRolesAsync(user, model.Roles);
        }

        public virtual async Task DeleteOneAsync(Guid userId, Guid modifierUserId)
        {
            ApplicationUser user = FindOne(userId);

            user.IsDeleted = true;
            user.ModifiedAt = DateHelper.GetUtc();
            user.ModifiedBy = modifierUserId.ToString();

            var updateResult = await _userManager.UpdateAsync(user);
            Require.Booleans.IsTrue<BadRequestException>(updateResult.Succeeded, updateResult.GetErrors);
        }

        #region Private

        private ApplicationUser FindOne(Guid userId)
        {
            string id = userId.ToString();

            ApplicationUser user = _userManager.Users.SingleOrDefault(u => u.Id == id && !u.IsDeleted);
            Require.Objects.NotNull<NotFoundException>(user, () => $"User with Id {id} is not found");

            return user;
        }

        private void CheckRole(string role)
        {
            var result = Enum.TryParse<UserRole>(role, true, out var checkedRole);
            Require.Booleans.IsTrue<BadRequestException>(result, $"Invalid role name: {role}");
        }

        private void CheckRole(IEnumerable<string> roles)
        {
            foreach (var role in roles)
            {
                CheckRole(role);
            }
        }

        private async Task ReAssignRolesAsync(ApplicationUser user, IEnumerable<string> roleNamesToAssign)
        {
            var userInRoles = await _userManager.GetRolesAsync(user);
            if (roleNamesToAssign.All(x => userInRoles.Contains(x)))
            {
                return;
            }

            var removeRolesResult = await _userManager.RemoveFromRolesAsync(user, userInRoles);
            Require.Booleans.IsTrue<BadRequestException>(removeRolesResult.Succeeded, removeRolesResult.GetErrors);

            CheckRole(roleNamesToAssign);
            var assignToRolesResult = await _userManager.AddToRolesAsync(user, roleNamesToAssign);
            Require.Booleans.IsTrue<BadRequestException>(assignToRolesResult.Succeeded, assignToRolesResult.GetErrors);
        }

        private void SendInvitationWithPassword(ApplicationUser user, string password)
        {
            //send an invitation email (TODO: get email template from Db)
            var bodyBuilder = new StringBuilder();
            var emailBody = bodyBuilder.AppendLine($"Dear, {user.Email}")
                .AppendLine("You have been registered in the system Animal Rescue.")
                .Append($"You can log in with a password: <b>{password}</b>")
                .ToString();

            _emailSender.SendMail(user.Email, "Animal Rescue - An invitation", emailBody);
        }

        #endregion
    }
}
