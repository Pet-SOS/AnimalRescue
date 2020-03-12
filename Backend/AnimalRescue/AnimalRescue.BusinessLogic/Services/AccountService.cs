﻿using AnimalRescue.Contracts.BusinessLogic.Interfaces;
using AnimalRescue.Contracts.BusinessLogic.Models.Account;
using AnimalRescue.Contracts.Common.Exceptions;
using AnimalRescue.DataAccess.Mongodb.Models;
using AnimalRescue.DataAccess.Mongodb.Enums;
using AnimalRescue.Infrastructure.Validation;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using System.IdentityModel.Tokens.Jwt;
using System.Web;
using Microsoft.Extensions.Configuration;
using AnimalRescue.BusinessLogic.Extensions;
using AnimalRescue.Contracts.BusinessLogic.Services;

namespace AnimalRescue.BusinessLogic.Services
{
    public class AccountService : IAccountService
    {

        public readonly UserManager<ApplicationUser> _userManager;
        public readonly SignInManager<ApplicationUser> _signInManager;
        private readonly ISecurityTokenRepository _securityTokensRepository;
        private readonly IJwtFactory _jwtFactory;
        private readonly IConfiguration _configuration;
        private readonly IEmailSender _emailSender;

        public AccountService(UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            ISecurityTokenRepository securityTokenRepository,
            IJwtFactory jwtFactory,
            IConfiguration configuration,
            IEmailSender emailSender
            )
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _securityTokensRepository = securityTokenRepository;
            _jwtFactory = jwtFactory;
            _configuration = configuration;
            _emailSender = emailSender;
        }
        public async Task<SignInAccountModel> SignIn(SignInAccountAuthorizationViewModel model)
        {
            ApplicationUser identityUser = _userManager.Users
                .SingleOrDefault(x => x.NormalizedEmail == model.Email.ToUpper());

            Require.Objects.NotNull<NotFoundException>(identityUser, $"User not found");

            var isConfirm = await _userManager.IsEmailConfirmedAsync(identityUser);
            if (!isConfirm)
            {
                throw new ApplicationException("Email not confirmed.");
            }

            var accessFailedCount = identityUser.AccessFailedCount;
            var signInResult = await _signInManager.PasswordSignInAsync(identityUser, model.Password, false, true);
            if (signInResult == SignInResult.Failed)
            {
                throw new ApplicationException("Invalid login attempt.");
            }
            if (signInResult == SignInResult.LockedOut)
            {
                if (accessFailedCount > 0)
                {
                    var token = await CreateSecurityTokenForUnlockUser(identityUser.Id);
                    await SendNotificationAboutLockAccount(identityUser, token);
                }

                throw new ApplicationException(@"Invalid login attempt.
                                Your account has been blocked for 10 minutes.");
            }
            var (accessToken, refreshToken, refreshTokenExpires) = await _jwtFactory.GenerateAuthorizationToken(identityUser, model.RememberMe);

            //TODO: CreateRefreshTokenIfNotExist

            var userRoles = await _userManager.GetRolesAsync(identityUser);

            var userData = new UserAccountModelItem
            {
                Email = identityUser.Email,
                UserId = identityUser.Id,
                UserName = $@"{identityUser.FirstName ?? string.Empty} {identityUser.LastName ?? string.Empty}",
                ProfilePhoto = identityUser.ProfilePhoto ?? string.Empty,
                UserRole = string.Join(",", userRoles)
            };

            var authData = new SignInAccountModel
            {
                Token = accessToken,
                //RefreshToken = refreshToken,
                ExpireDate = refreshTokenExpires,
                User = userData
            };

            return authData;
        }

        public async Task ForgotPassword(ForgotPasswordAccountViewModel model)
        {
            ApplicationUser user = await _userManager.FindByEmailAsync(model.Email.ToUpper());
            Require.Objects.NotNull<NotFoundException>(user, $"User not found");

            var isEmailConfirmed = await _userManager.IsEmailConfirmedAsync(user);

            if (!isEmailConfirmed)
            {
                throw new ApplicationException("Email is not confirmed.");
            }

            var code = await _userManager.GeneratePasswordResetTokenAsync(user);

            var url = $"{_configuration["FrontEndUrl"]}account/reset-password?userId={HttpUtility.UrlEncode(user.Id)}&code={HttpUtility.UrlEncode(code)}";

            var bodyBuilder = new StringBuilder();
            var body = bodyBuilder.AppendLine($"Hi, {user.FirstName}! ")
                .Append($"Please click on <a href='{url}'>link</a> to reset passowrd.")
                .ToString();

            _emailSender.SendMail(user.Email, "Reset Password", body);
        }

        public async Task<string> ResetPassword(ResetPasswordAccountViewModel model)
        {
            var userId = HttpUtility.UrlDecode(model.UserId);
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                throw new ApplicationException("User not found.");
            }

            var validCode = model.Code.Replace(" ", "+").Replace("%20", "+");
            var result = await _userManager.ResetPasswordAsync(user, validCode, model.Password);
            if (!result.Succeeded)
            {
                throw new ApplicationException(result.GetErrors());
            }

            return $"{_configuration["FrontEndUrl"]}account/signIn";
        }

        public async Task<string> UnlockUser(string token)
        {
            var securityToken = await _securityTokensRepository.GetIfExists(token);
            Require.Objects.NotNull<NotFoundException>(token, "Token not found");

            await _securityTokensRepository.DeleteAsync(securityToken.Id);

            var jwtToken = new JwtSecurityTokenHandler().ReadJwtToken(token);
            var userId = jwtToken.Claims.SingleOrDefault(claim => claim.Type == "UserId").Value;

            if (string.IsNullOrEmpty(userId) || jwtToken.ValidTo < DateTime.UtcNow)
            {
                throw new ApplicationException("This token is invalid or expired");
            }

            ApplicationUser user = await _userManager.FindByIdAsync(userId);
            Require.Objects.NotNull<NotFoundException>(token, "User not found");

            await _userManager.SetLockoutEndDateAsync(user, new DateTimeOffset(DateTime.UtcNow));

            return $"{_configuration["FrontEndUrl"]}account/forgot-password";
        }

        #region Private

        private async Task<string> CreateSecurityTokenForUnlockUser(string userId)
        {
            var token = _jwtFactory.GenerateSecurityTokenLockedUser(userId);
            var securityToken = new SecurityToken()
            {
                Token = token,
                Type = TokenType.LockedUser.ToString()
            };
            await _securityTokensRepository.CreateAsync(securityToken);

            return token;
        }

        private async Task SendNotificationAboutLockAccount(ApplicationUser user, string token)
        {
            var bodyBuilder = new StringBuilder();

            string link = $"{_configuration["FrontEndUrl"]}account/unlock-account?token={token}";
            var body = bodyBuilder.AppendLine($"Dear {user.FirstName},")
                .AppendLine("Your account has been blocked because you exceeded the number of login attempts.")
                .Append($"To unlock your account click on verification <a href='{link}'>link</a>")
                .ToString();
            _emailSender.SendMail(user.Email, "Account Lock", body);
        }

        #endregion

    }
}