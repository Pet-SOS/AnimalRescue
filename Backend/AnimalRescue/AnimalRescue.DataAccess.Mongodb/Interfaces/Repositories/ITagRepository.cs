using AnimalRescue.Contracts.Common.Interfaces.CRUD;
using AnimalRescue.DataAccess.Mongodb.Models;
using AnimalRescue.DataAccess.Mongodb.Query;
using System.Collections.Generic;

namespace AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories
{
    public interface ITagRepository :
        IBaseQuerAsyncy<List<Tags>, DbQuery>,
        IBaseQuerAsyncy<Tags, string>,
        IBaseCountQueryAsync<DbQuery>,
        IBaseCreateAsync<Tags>,
        IBaseUpdateAsync<Tags>,
        IBaseDeleteAsync<string>
	{
    }
}
