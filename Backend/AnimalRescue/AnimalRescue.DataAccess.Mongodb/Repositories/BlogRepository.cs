using AnimalRescue.DataAccess.Contracts.Query;
using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Models;
using AnimalRescue.DataAccess.Mongodb.QueryBuilders;

using AutoMapper;

using MongoDB.Driver;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace AnimalRescue.DataAccess.Mongodb.Repositories
{
    internal class BlogRepository : BaseCollection<Blog>, IBlogRepository
	{
		public BlogRepository(
            IMongoDatabase database,
            IQueryBuilder<Blog> queryBuilder,
            IMapper mapper)
            : base(database, queryBuilder, mapper)
        {
        }

        public async Task<IList<Blog>> GetBlogsWithPagginationAsync(DbQuery query)
		{
			return await GetAsync(query);
		}

		public async Task<int> GetBlogsCountAsync(DbQuery query)
		{
			return await GetCountAsync(query);
		}
	}
}
