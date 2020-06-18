using AnimalRescue.Contracts.BusinessLogic.Models.Account;
using System.Threading.Tasks;

namespace AnimalRescue.Contracts.BusinessLogic.Interfaces
{
    public interface IAccountService
    {
        Task<SignInAccountModel> SignInAsync(SignInAccountAuthorizationViewModel model);
        Task<string> UnlockUser(string token);

        Task ForgotPassword(ForgotPasswordAccountViewModel model);
        Task<string> ResetPassword(ResetPasswordAccountViewModel model);
        Task<SignInAccountModel> RefreshTokenAsync(string requestToken, string requestRefreshToken);
    }
}
