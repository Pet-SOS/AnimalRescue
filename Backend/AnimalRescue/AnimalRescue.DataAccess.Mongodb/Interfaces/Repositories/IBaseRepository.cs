using AnimalRescue.Contracts.Common.Interfaces.CRUD;
using AnimalRescue.DataAccess.Mongodb.Query;

using System.Collections.Generic;

namespace AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories
{
    public interface IBaseRepository<TEntity> :
        IBaseQuerAsyncy<List<TEntity>, DbQuery>,
        IBaseQuerAsyncy<TEntity, string>,
        IBaseCountQueryAsync<DbQuery>,
        IBaseCreateAsync<TEntity>,
        IBaseUpdateAsync<TEntity>,
        IBaseDeleteAsync<string>
    {
    }
}
