using AnimalRescue.Contracts.Common.Interfaces.CRUD;
using AnimalRescue.DataAccess.Mongodb.Query;

using System.Collections.Generic;

namespace AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories
{
    public interface IBaseRepository<TEntity> :
        IBaseQueryAsync<List<TEntity>, DbQuery>,
        IBaseQueryAsync<TEntity, string>,
        IBaseCountQueryAsync<DbQuery>,
        IBaseCreateAsync<TEntity>,
        IBaseUpdateAsync<TEntity>,
        IBaseDeleteAsync<string>
    {
        IAsyncEnumerable<TEntity> GetAllItemsAsync();
    }
}
