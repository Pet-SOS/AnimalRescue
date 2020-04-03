using AnimalRescue.Contracts.BusinessLogic.Models;
using AnimalRescue.Contracts.BusinessLogic.Models.UsersManagement;
using AnimalRescue.Contracts.Common.Query;
using System;
using System.Threading.Tasks;

namespace AnimalRescue.Contracts.BusinessLogic.Interfaces.UsersManagement
{
    public interface IUsersManagementService
    {
        Task<GetUserUsersManagementViewItem> CreateNew(Guid modifierUserId, CreateNewUsersManagementViewModel model);
        Task<BlCollectonResponse<GetUserUsersManagementViewItem>> GetActiveUsers(ApiQueryRequest queryRequest);
        Task<GetUserUsersManagementViewItem> GetUser(Guid userId);
        Task UpdateOne(Guid userId, Guid userIdModifier, EditUsersManagementViewModel model);
        Task DeleteOne(Guid userId, Guid modifierUserId);
    }
}
