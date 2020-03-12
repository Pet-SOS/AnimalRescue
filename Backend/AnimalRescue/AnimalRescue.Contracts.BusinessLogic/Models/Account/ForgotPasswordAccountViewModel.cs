using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace AnimalRescue.Contracts.BusinessLogic.Models.Account
{
    public class ForgotPasswordAccountViewModel
    {
        [Required]
        public string Email { get; set; }
    }
}
