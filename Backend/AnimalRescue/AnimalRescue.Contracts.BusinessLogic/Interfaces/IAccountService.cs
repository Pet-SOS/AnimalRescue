using AnimalRescue.Contracts.BusinessLogic.Models.Account;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace AnimalRescue.Contracts.BusinessLogic.Interfaces
{
    public interface IAccountService
    {
        Task<SignInAccountModel> SignIn(SignInAccountAuthorizationViewModel model);
        Task<string> UnlockUser(string token);

        Task ForgotPassword(ForgotPasswordAccountViewModel model);
        Task<string> ResetPassword(ResetPasswordAccountViewModel model);
    }
}
