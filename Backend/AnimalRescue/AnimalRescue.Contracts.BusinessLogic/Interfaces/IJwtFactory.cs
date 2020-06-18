using System;
using System.Threading.Tasks;

namespace AnimalRescue.Contracts.BusinessLogic.Interfaces
{
    public interface IJwtFactory
    {
        Task<(string generatedAccessToken, string generatedAccessTokenId, string generatedRefreshToken, DateTime refreshTokenExpires)> GenerateAuthorizationToken(string userId, bool rememberMe);
        string GenerateSecurityTokenLockedUser(string userId);
    }
}
