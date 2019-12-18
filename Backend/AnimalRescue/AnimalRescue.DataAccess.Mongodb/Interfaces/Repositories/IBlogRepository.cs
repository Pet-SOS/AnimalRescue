using AnimalRescue.DataAccess.Contracts.Query;
using AnimalRescue.DataAccess.Mongodb.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories
{
	public interface IBlogRepository
	{
		Task<IList<Blog>> GetBlogsWithPagginationAsync(DbQuery query);

		Task<int> GetBlogsCountAsync(DbQuery query);
	}
}
