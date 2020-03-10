using System;
using System.Collections.Generic;
using System.Text;

namespace AnimalRescue.Contracts.BusinessLogic.Models.Account
{
    public class SignInAccountModel
    {
        public string Token { get; set; }
        //public string RefreshToken { get; set; }
        public DateTime ExpireDate { get; set; }
        public UserAccountModelItem User { get; set; }
    }

    public class UserAccountModelItem
    {
        public string Email { get; set; }
        public string UserId { get; set; }
        public string UserName { get; set; }
        public string ProfilePhoto { get; set; }
        public string UserRole { get; set; }
    }
}
