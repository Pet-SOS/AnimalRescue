using AnimalRescue.Contracts.BusinessLogic.Interfaces;
using AnimalRescue.Contracts.BusinessLogic.Models.Account;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace AnimalRescue.API.Controllers
{
    /// <summary>
    /// API User Identity
    /// </summary>
    public class AccountController : ApiControllerBase
    {
        private readonly IAccountService _accountService;
        public AccountController(IAccountService accountService)
        {
            _accountService = accountService;
        }


        /// <summary>
        /// Allows to authorize in Animal Rescue system.
        /// </summary>
        /// <param name="model"></param>
        /// <returns>Authorization data.</returns>
        [HttpPost]
        [ProducesResponseType(typeof(SignInAccountModel), 200)]
        [ProducesResponseType(typeof(string), 400)]
        [Route("signIn")]
        public async Task<IActionResult> SignIn([FromBody] SignInAccountAuthorizationViewModel model)
        {
            var authData = await _accountService.SignInAsync(model);
            if (authData is null)
            {
                return BadRequest("Authorization failed");
            }

            return Ok(authData);
        }

        /// <summary>
        /// Makes a reset password link and sends an email.
        /// </summary>
        /// <param name="model"></param>
        /// <returns>Reset Password link.</returns>
        [HttpPost]
        [ProducesResponseType(200)]
        [ProducesResponseType(typeof(string), 400)]
        [ProducesResponseType(typeof(string), 404)]
        [Route("forgotPassword")]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordAccountViewModel model)
        {
            await _accountService.ForgotPassword(model);
            return Ok();
        }

        /// <summary>
        /// Allows to reset password.
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        [ProducesResponseType(302)]
        [ProducesResponseType(typeof(string), 400)]
        [Route("resetPassword")]
        public async Task<IActionResult> ResetPassoword([FromBody] ResetPasswordAccountViewModel model)
        {
            var returnUrl = await _accountService.ResetPassword(model);
            return Redirect(returnUrl);
        }

        /// <summary>
        /// Allows to unlock a user account.
        /// </summary>
        /// <param name="token"></param>
        /// <returns></returns>
        [HttpPost]
        [ProducesResponseType(302)]
        [ProducesResponseType(typeof(string), 400)]
        [ProducesResponseType(typeof(string), 404)]
        [Route("unlockAccount")]
        public async Task<IActionResult> UnlockAccount(string token)
        {
            var returnUrl = await _accountService.UnlockUser(token);
            return Redirect(returnUrl);
        }

    }
}
