using AnimalRescue.Contracts.Common.Interfaces.CRUD;
using AnimalRescue.DataAccess.Mongodb.Models;
using AnimalRescue.DataAccess.Mongodb.Query;

using System.Collections.Generic;

namespace AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories
{
    public interface IStoryRepository :
        IBaseQuerAsyncy<List<Story>, DbQuery>,
        IBaseQuerAsyncy<Story, string>,
        IBaseCountQueryAsync<DbQuery>,
        IBaseCreateAsync<Story>,
        IBaseUpdateAsync<Story>,
        IBaseDeleteAsync<string>
    {
    }
}
