using AnimalRescue.Contracts.Common.Interfaces.CRUD;
using AnimalRescue.DataAccess.Mongodb.Models;
using AnimalRescue.DataAccess.Mongodb.Query;

using System.Collections.Generic;

namespace AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories
{
	public interface IBlogRepository :
		IBaseQuerAsyncy<List<Blog>, DbQuery>,
		IBaseQuerAsyncy<Blog, string>,
		IBaseCountQueryAsync<DbQuery>,
		IBaseCreateAsync<Blog>,
		IBaseUpdateAsync<Blog>,
		IBaseDeleteAsync<string>
	{
	}
}
