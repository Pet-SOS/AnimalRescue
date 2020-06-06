using AnimalRescue.Contracts.Common.Interfaces.CRUD;
using AnimalRescue.DataAccess.Mongodb.Query;

using MongoDB.Bson;

using System.Collections.Generic;
using System.Threading.Tasks;

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
        Task<BsonValue> ExecuteScriptAsync(string javascript);
    }
}
