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

        [HttpPost]
        [ProducesResponseType(typeof(SignInAccountModel), 200)]
        [ProducesResponseType(typeof(string), 400)]
        [Route("signIn")]
        public async Task<IActionResult> SignIn([FromBody] SignInAccountAuthorizationViewModel model)
        {
            var authData = await _accountService.SignIn(model);
            if (authData is null)
            {
                return BadRequest("Authorization failed");
            }

            return Ok(authData);
        }

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

        [HttpPost]
        [ProducesResponseType(302)]
        [ProducesResponseType(typeof(string), 400)]
        [Route("resetPassword")]
        public async Task<IActionResult> ResetPassoword([FromBody] ResetPasswordAccountViewModel model)
        {
            var returnUrl = await _accountService.ResetPassword(model);
            return Redirect(returnUrl);
        }

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
