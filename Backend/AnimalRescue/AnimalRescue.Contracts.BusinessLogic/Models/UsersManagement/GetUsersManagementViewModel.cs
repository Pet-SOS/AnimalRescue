using System.Collections.Generic;

namespace AnimalRescue.Contracts.BusinessLogic.Models.UsersManagement
{
    public class GetUsersManagementViewModel
    {
        public string UserId { get; set; }

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }

        public string PhoneNumber { get; set; }
        public string ProfilePhoto { get; set; }

        public string CreatedAt { get; set; }

        public List<string> Roles { get; set; }

        public GetUsersManagementViewModel()
        {
            Roles = new List<string>();
        }
    }
}
