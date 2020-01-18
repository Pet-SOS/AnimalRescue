using AnimalRescue.Contracts.Common.Interfaces.CRUD;
using AnimalRescue.DataAccess.Mongodb.Models;
using AnimalRescue.DataAccess.Mongodb.Query;

using System.Collections.Generic;

namespace AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories
{
	public interface IArticleRepository :
		IBaseQuerAsyncy<List<Article>, DbQuery>,
		IBaseQuerAsyncy<Article, string>,
		IBaseCountQueryAsync<DbQuery>,
		IBaseCreateAsync<Article>,
		IBaseUpdateAsync<Article>,
		IBaseDeleteAsync<string>
	{
	}
}
