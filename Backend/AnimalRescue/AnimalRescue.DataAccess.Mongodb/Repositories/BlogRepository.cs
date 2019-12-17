using AnimalRescue.DataAccess.Mongodb.Configurations;
using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Models;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AnimalRescue.DataAccess.Mongodb.Repositories
{
	internal class BlogRepository : Repository<Blog>, IBlogRepository
	{
		public BlogRepository(IMongoClient client, IMongoDbSettings settings) : base(client, settings)
		{
		}

		public async Task<IList<Blog>> GetBlogsWithPagginationAsync(int pageNubmer, int pageSize)
		{
			return await GetAsync(pageNubmer, pageSize, b => b.CreatedAt);
		}

		public async Task<int> GetBlogsCountAsync()
		{
			return await GetCountAsync();
		}
	}
}
