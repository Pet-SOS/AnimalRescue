using System;
using System.ComponentModel.DataAnnotations;

namespace AnimalRescue.Contracts.BusinessLogic.Models.Account
{
    public class ResetPasswordAccountViewModel
    {
        [Required]
        public string UserId { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        public string Code { get; set; }
    }
}
