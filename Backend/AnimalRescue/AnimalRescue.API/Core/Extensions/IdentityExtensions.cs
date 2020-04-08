using AnimalRescue.BusinessLogic.Common;
using AnimalRescue.Contracts.BusinessLogic.Models;
using AnimalRescue.Contracts.Common.Exceptions;
using System;
using System.Linq;
using System.Security.Claims;
using System.Security.Principal;

namespace AnimalRescue.API.Core.Extensions
{
    public static class IdentityExtensions
    {
        public static IdentityUserModel GetUser(this IIdentity identity)
        {
            ClaimsIdentity claimsIdentity = identity as ClaimsIdentity;
            Guid.TryParse(claimsIdentity?.FindFirst(JwtClaimTypeConstants.UserId)?.Value, out Guid userId);
            var user = new IdentityUserModel
            {
                Id = userId,
                Email = claimsIdentity?.FindFirst(ClaimTypes.Email)?.Value,
                UserName = claimsIdentity?.FindFirst(ClaimTypes.Name)?.Value,
                FirstName = claimsIdentity?.FindFirst(ClaimTypes.GivenName)?.Value,
                LastName = claimsIdentity?.FindFirst(ClaimTypes.Surname)?.Value,
                Roles = claimsIdentity?.FindAll(ClaimTypes.Role).Select(x => x?.Value).ToList()
            };
            ValidateUser(user);

            return user;
        }

        private static void ValidateUser(IdentityUserModel user)
        {
            if (user.Id == Guid.Empty
                || string.IsNullOrEmpty(user.Email)
                || string.IsNullOrEmpty(user.UserName)
                || !user.Roles.Any())
            {
                throw new UnauthorizedException("Can't get required users field. Token isn't valid");
            }
        }
    }
}
