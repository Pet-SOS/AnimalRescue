using AnimalRescue.Contracts.Common.Interfaces.CRUD;
using AnimalRescue.DataAccess.Mongodb.Models;
using AnimalRescue.DataAccess.Mongodb.Query;
using System.Collections.Generic;

namespace AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories
{
    public interface IBlogTagRepository :
        IBaseQuerAsyncy<List<BlogTag>, DbQuery>,
        IBaseQuerAsyncy<BlogTag, string>,
        IBaseCountQueryAsync<DbQuery>,
        IBaseCreateAsync<BlogTag>,
        IBaseUpdateAsync<BlogTag>,
        IBaseDeleteAsync<string>
	{
    }
}
