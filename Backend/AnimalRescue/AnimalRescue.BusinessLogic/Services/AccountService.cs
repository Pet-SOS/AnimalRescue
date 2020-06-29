using AnimalRescue.Contracts.BusinessLogic.Interfaces;
using AnimalRescue.Contracts.BusinessLogic.Models.Account;
using AnimalRescue.Contracts.Common.Exceptions;
using AnimalRescue.DataAccess.Mongodb.Models;
using AnimalRescue.DataAccess.Mongodb.Enums;
using AnimalRescue.Infrastructure.Validation;
using Microsoft.AspNetCore.Identity;
using System;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Web;
using AnimalRescue.BusinessLogic.Extensions;
using AnimalRescue.Contracts.BusinessLogic.Services;
using AnimalRescue.Infrastructure.Configurations;
using Microsoft.Extensions.Options;
using AutoMapper;
using Microsoft.IdentityModel.Tokens;
using SecurityToken = AnimalRescue.DataAccess.Mongodb.Models.SecurityToken;

namespace AnimalRescue.BusinessLogic.Services
{
    public class AccountService : IAccountService
    {

        public readonly UserManager<ApplicationUser> _userManager;
        public readonly SignInManager<ApplicationUser> _signInManager;
        private readonly TokenValidationParameters _tokenValidationParameters;
        private readonly ISecurityTokenRepository _securityTokensRepository;
        private readonly IRefreshTokenRepository _refreshTokenRepository;
        private readonly IJwtFactory _jwtFactory;
        private readonly AppSettings _appSettings;
        private readonly IEmailSender _emailSender;
        private readonly IMapper _mapper;

        public AccountService(UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            TokenValidationParameters tokenValidationParameters,
            ISecurityTokenRepository securityTokenRepository,
            IRefreshTokenRepository refreshTokenRepository,
            IJwtFactory jwtFactory,
            IOptions<AppSettings> appSettingsOptions,
            IEmailSender emailSender,
            IMapper mapper)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _securityTokensRepository = securityTokenRepository;
            _jwtFactory = jwtFactory;
            _appSettings = appSettingsOptions.Value;
            _emailSender = emailSender;
            _mapper = mapper;
            _refreshTokenRepository = refreshTokenRepository;
            _tokenValidationParameters = tokenValidationParameters;
        }

        public async Task<SignInAccountModel> SignInAsync(SignInAccountAuthorizationViewModel model)
        {
            ApplicationUser identityUser = _userManager.Users
                .SingleOrDefault(x => x.NormalizedEmail == model.Email.ToUpper() && !x.IsDeleted);

            Require.Objects.NotNull<NotFoundException>(identityUser, $"User not found");

            var isConfirm = await _userManager.IsEmailConfirmedAsync(identityUser);
            Require.Booleans.IsTrue<BadRequestException>(isConfirm, "Email is not confirmed.");

            var accessFailedCount = identityUser.AccessFailedCount;
            var signInResult = await _signInManager.PasswordSignInAsync(identityUser, model.Password, false, true);
            if (signInResult == SignInResult.Failed)
            {
                throw new BadRequestException("Invalid login attempt.");
            }
            if (signInResult == SignInResult.LockedOut)
            {
                if (accessFailedCount > 0)
                {
                    var token = await CreateSecurityTokenForUnlockUser(identityUser.Id);
                    await SendNotificationAboutLockAccount(identityUser, token);
                }

                throw new BadRequestException(@"Invalid login attempt.
                                Your account has been blocked for 10 minutes.");
            }

            return await GenerateSignInAccountModelAsync(identityUser, model.RememberMe);
        }

        public async Task ForgotPassword(ForgotPasswordAccountViewModel model)
        {
            ApplicationUser user = await _userManager.FindByEmailAsync(model.Email.ToUpper());
            Require.Objects.NotNull<NotFoundException>(user, $"User not found");

            var isEmailConfirmed = await _userManager.IsEmailConfirmedAsync(user);

            if (!isEmailConfirmed)
            {
                throw new BadRequestException("Email is not confirmed.");
            }

            var code = await _userManager.GeneratePasswordResetTokenAsync(user);

            var url = $"{_appSettings.FrontEndUrl}account/reset-password?userId={HttpUtility.UrlEncode(user.Id)}&code={HttpUtility.UrlEncode(code)}";

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
            Require.Objects.NotNull<NotFoundException>(user, $"User not found");

            var validCode = model.Code.Replace(" ", "+").Replace("%20", "+");
            var result = await _userManager.ResetPasswordAsync(user, validCode, model.Password);
            if (!result.Succeeded)
            {
                throw new BadRequestException(result.GetErrors());
            }

            return $"{_appSettings.FrontEndUrl}account/signIn";
        }

        public async Task<SignInAccountModel> RefreshTokenAsync(string requestToken, string refreshToken)
        {
            var validatedToken = GetPrincipalFromToken(requestToken);

            if (validatedToken == null)
            {
                throw new BadRequestException("Invalid Token");
            }

            var expiryDateUnix = long.Parse(validatedToken.Claims.Single(x => x.Type == JwtRegisteredClaimNames.Exp).Value);
            var expiryDateTimeUtc = new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc).AddSeconds(expiryDateUnix);

            if (expiryDateTimeUtc > DateTime.UtcNow)
            {
                throw new BadRequestException("This token hasn't expired yet");
            }

            var jti = validatedToken.Claims.Single(x => x.Type == JwtRegisteredClaimNames.Jti).Value;

            var storedRefreshToken = await _refreshTokenRepository.GetByToken(refreshToken);

            if (storedRefreshToken == null || DateTime.UtcNow > storedRefreshToken.ExpiredAt)
            {
                throw new BadRequestException("This refresh token doesn't exist or has expired");
            }

            if (storedRefreshToken.JwtId != jti)
            {
                throw new BadRequestException("This refresh token does not match this access token");
            }

            var user = await _userManager.FindByIdAsync(validatedToken.Claims.Single(x => x.Type == "UserId").Value);

            await DeleteExpiredRefreshTokensByUserId(user.Id);

            return await GenerateSignInAccountModelAsync(user, storedRefreshToken.IsRememberTokenLongerTime);
        }

        public async Task<string> UnlockUser(string token)
        {
            var securityToken = await _securityTokensRepository.GetByToken(token);
            Require.Objects.NotNull<NotFoundException>(token, "Token not found");

            await _securityTokensRepository.DeleteAsync(securityToken.Id);

            var jwtToken = new JwtSecurityTokenHandler().ReadJwtToken(token);
            var userId = jwtToken.Claims.SingleOrDefault(claim => claim.Type == "UserId").Value;

            if (string.IsNullOrEmpty(userId) || jwtToken.ValidTo < DateTime.UtcNow)
            {
                throw new BadRequestException("This token is invalid or expired");
            }

            ApplicationUser user = await _userManager.FindByIdAsync(userId);
            Require.Objects.NotNull<NotFoundException>(token, "User not found");

            await _userManager.SetLockoutEndDateAsync(user, new DateTimeOffset(DateTime.UtcNow));

            return $"{_appSettings.FrontEndUrl}account/forgot-password";
        }

        #region Private

        private async Task<SignInAccountModel> GenerateSignInAccountModelAsync(ApplicationUser user, bool isRememberUserLonger)
        {
            var (accessToken, accessTokenId, refreshToken, refreshTokenExpires) = await _jwtFactory.GenerateAuthorizationToken(user.Id, isRememberUserLonger);

            await SaveRefreshTokenAsync(accessTokenId, refreshToken, user.Id, refreshTokenExpires, isRememberUserLonger);

            var userData = _mapper.Map<UserAccountModelItem>(user);
            userData.UserRoles.AddRange(await _userManager.GetRolesAsync(user));

            var authData = new SignInAccountModel
            {
                Token = accessToken,
                RefreshToken = refreshToken,
                ExpireDate = refreshTokenExpires,
                User = userData
            };

            return authData;
        }

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

            string link = $"{_appSettings.FrontEndUrl}account/unlock-account?token={token}";
            var body = bodyBuilder.AppendLine($"Dear {user.FirstName},")
                .AppendLine("Your account has been blocked because you exceeded the number of login attempts.")
                .Append($"To unlock your account click on verification <a href='{link}'>link</a>")
                .ToString();
            _emailSender.SendMail(user.Email, "Account Lock", body);

            await Task.CompletedTask;
        }

        private ClaimsPrincipal GetPrincipalFromToken(string token)
        {
            var tokenHandler = new JwtSecurityTokenHandler();

            try
            {
                var tokenValidationParameters = _tokenValidationParameters.Clone();
                tokenValidationParameters.ValidateLifetime = false;
                var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out var validatedToken);
                if (!IsJwtWithValidSecurityAlgorithm(validatedToken))
                {
                    return null;
                }

                return principal;
            }
            catch
            {
                return null;
            }
        }

        private bool IsJwtWithValidSecurityAlgorithm(Microsoft.IdentityModel.Tokens.SecurityToken validatedToken)
        {
            return (validatedToken is JwtSecurityToken jwtSecurityToken) &&
                   jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256,
                       StringComparison.InvariantCultureIgnoreCase);
        }

        private async Task SaveRefreshTokenAsync(string accessTokenId, string refreshToken, string userId, DateTime refreshTokenExpires, bool isRememberUserLonger)
        {
            var newRefreshToken = new RefreshToken
            {
                JwtId = accessTokenId,
                Token = refreshToken,
                UserId = userId,
                CreatedAt = DateTime.UtcNow,
                ExpiredAt = refreshTokenExpires,
                IsRememberTokenLongerTime = isRememberUserLonger
            };

            await _refreshTokenRepository.CreateAsync(newRefreshToken);
        }

        private async Task DeleteExpiredRefreshTokensByUserId(string userId)
        {
            await _refreshTokenRepository.DeleteExpiredByUserId(userId);
        }

        #endregion

    }
}
