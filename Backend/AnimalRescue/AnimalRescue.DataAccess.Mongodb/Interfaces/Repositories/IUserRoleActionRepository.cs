using AnimalRescue.DataAccess.Mongodb.Models;
using AnimalRescue.Contracts.Common.Interfaces.CRUD;
using AnimalRescue.DataAccess.Mongodb.Models.Tag;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories
{
    public interface IUserRoleActionRepository : 
        IBaseRepository<UserRoleAction>,
        IBaseCreateAsync<IEnumerable<UserRoleAction>, IEnumerable<UserRoleAction>>,
        IBaseWhereAsync<List<UserRoleAction>, List<UserRoleAction>>
    {
        Task<List<UserRoleAction>> WhereByIdAsync(List<UserRoleAction> actions);
    }
}
