using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace AnimalRescue.Contracts.BusinessLogic.Models.UsersManagement
{
    public class EditUsersManagementViewModel
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        public string FirstName { get; set; }
        public string LastName { get; set; }

        public string PhoneNumber { get; set; }

        [Required]
        public List<string> Roles { get; set; }
    }
}
