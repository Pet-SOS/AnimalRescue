using AnimalRescue.Contracts.BusinessLogic.Models;
using AnimalRescue.Contracts.BusinessLogic.Models.UsersManagement;
using AnimalRescue.Contracts.Common.Query;
using System;
using System.Threading.Tasks;

namespace AnimalRescue.Contracts.BusinessLogic.Interfaces.UsersManagement
{
    public interface IUsersManagementService
    {
        Task<GetUserUsersManagementViewItem> CreateNewAsync(Guid modifierUserId, CreateNewUsersManagementViewModel model);
        Task<BlCollectonResponse<GetUserUsersManagementViewItem>> GetUsersAsync(ApiQueryRequest queryRequest);
        Task<GetUserUsersManagementViewItem> GetUserAsync(Guid userId);
        Task UpdateOneAsync(Guid userId, Guid userIdModifier, EditUsersManagementViewModel model);
        Task DeleteOneAsync(Guid userId, Guid modifierUserId);
    }
}
