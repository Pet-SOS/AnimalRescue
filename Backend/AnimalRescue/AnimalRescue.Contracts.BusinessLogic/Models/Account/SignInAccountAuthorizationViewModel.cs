using System;
using System.ComponentModel.DataAnnotations;

namespace AnimalRescue.Contracts.BusinessLogic.Models.Account
{
    public class SignInAccountAuthorizationViewModel
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }
        public bool RememberMe { get; set; }
    }
}
