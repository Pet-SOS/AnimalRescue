using System;
using System.Collections.Generic;
using System.Text;

namespace AnimalRescue.Contracts.BusinessLogic.Models
{
    public class IdentityUserModel
    {
        public string Id { get; set; }
        public string Email { get; set; }
        public string UserName { get; set; }
        public string FullName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public IEnumerable<string> Roles { get; set; }
    }
}
