using AnimalRescue.BusinessLogic.Common;
using AnimalRescue.Contracts.BusinessLogic.Interfaces;
using AnimalRescue.DataAccess.Mongodb.Models;
using AnimalRescue.Infrastructure.Configurations;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace AnimalRescue.BusinessLogic.Services
{
    public class JwtFactory : IJwtFactory
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly AppSettings _appSettings;

        public JwtFactory(UserManager<ApplicationUser> userManager, IOptions<AppSettings> appSettings)
        {
            _userManager = userManager;
            _appSettings = appSettings.Value;
        }

        public async Task<(string generatedAccessToken, string generatedAccessTokenId, string generatedRefreshToken, DateTime refreshTokenExpires)> GenerateAuthorizationToken(string userId, bool rememberMe)
        {
            var user = await _userManager.FindByIdAsync(userId);
            var userRoles = await _userManager.GetRolesAsync(user);

            var claims = new List<Claim>
            {
                new Claim(JwtClaimTypeConstants.UserId, user.Id),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(ClaimTypes.GivenName, user.FirstName ?? string.Empty),
                new Claim(ClaimTypes.Surname, user.LastName ?? string.Empty)
            };
            claims.AddRange(userRoles.Select(role => new Claim(ClaimTypes.Role, role)).ToList());

            var utcNow = DateTime.UtcNow;
            DateTime authTokenExpires = utcNow.AddHours(Convert.ToDouble(_appSettings.JwtExpireHours));
            //DateTime authTokenExpires = utcNow.AddMinutes(1);
            DateTime refreshTokenExpires = utcNow.AddDays(Convert.ToDouble(rememberMe ? _appSettings.JwtExpireDaysGain : _appSettings.JwtExpireDays));
            //DateTime refreshTokenExpires = utcNow.AddMinutes(2);

            var accessToken = GenerateJwt(claims, authTokenExpires);

            string generatedAccessTokenId = accessToken.Id;
            string generatedRefreshToken = Convert.ToBase64String(Guid.NewGuid().ToByteArray());

            var generatedAccessToken = new JwtSecurityTokenHandler().WriteToken(accessToken);

            return (generatedAccessToken, generatedAccessTokenId, generatedRefreshToken, refreshTokenExpires);
        }

        public string GenerateSecurityTokenLockedUser(string userId)
        {
            var claims = new List<Claim>();
            claims.Add(new Claim(JwtClaimTypeConstants.UserId, userId));
            var expiresIn = DateTime.UtcNow.AddMinutes(10);
            var token = GenerateJwt(claims, expiresIn);
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private JwtSecurityToken GenerateJwt(List<Claim> claims, DateTime expiresIn)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_appSettings.JwtKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                _appSettings.JwtIssuer,
                _appSettings.JwtAudience,
                claims,
                expires: expiresIn,
                signingCredentials: creds);

            return token;
        }
    }
}
