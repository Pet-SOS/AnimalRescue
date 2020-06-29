using System.ComponentModel.DataAnnotations;

namespace AnimalRescue.Contracts.BusinessLogic.Models.Account
{
    public class RefreshTokenRequestViewModel
    {
        [Required]
        public string Token { get; set; }

        [Required]
        public string RefreshToken { get; set; }
    }
}
