using AnimalRescue.DataAccess.Mongodb.Models;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace AnimalRescue.Contracts.BusinessLogic.Interfaces
{
    public interface IJwtFactory
    {
        Task<(string generatedAccessToken, string generatedRefreshToken, DateTime refreshTokenExpires)> GenerateAuthorizationToken(ApplicationUser user, bool rememberMe);
        string GenerateSecurityTokenLockedUser(string userId);
    }
}
