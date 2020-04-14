using AnimalRescue.Contracts.BusinessLogic.Models;
using AnimalRescue.Contracts.BusinessLogic.Models.UsersManagement;
using AnimalRescue.Contracts.Common.Query;
using System;
using System.Threading.Tasks;

namespace AnimalRescue.Contracts.BusinessLogic.Interfaces.UsersManagement
{
    public interface IUsersManagementService
    {
        Task<GetUsersManagementViewModel> CreateAsync(Guid modifierUserId, CreateUsersManagementViewModel model);
        Task<BlCollectonResponse<GetUsersManagementViewModel>> GetAsync(ApiQueryRequest queryRequest);
        Task<GetUsersManagementViewModel> GetAsync(Guid userId);
        Task UpdateOneAsync(Guid userId, Guid userIdModifier, EditUsersManagementViewModel model);
        Task DeleteOneAsync(Guid userId, Guid modifierUserId);
    }
}
