using System;
using System.Collections.Generic;
using System.Text;

namespace AnimalRescue.Contracts.BusinessLogic.Models.UsersManagement
{
    public class UserUsersManagementViewItem
    {
        public string Id { get; set; }

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }

        public List<string> Roles { get; set; }
    }
}
