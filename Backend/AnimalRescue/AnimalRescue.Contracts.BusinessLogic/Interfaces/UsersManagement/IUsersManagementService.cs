using AnimalRescue.Contracts.BusinessLogic.Models.UsersManagement;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace AnimalRescue.Contracts.BusinessLogic.Interfaces.UsersManagement
{
    public interface IUsersManagementService: IBaseUsersManagementService
    {
        Task<UserUsersManagementViewItem> AddNew(AddNewUsersManagementViewModel model);
    }
}
