using AnimalRescue.DataAccess.Mongodb.Interfaces;
using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Models;
using AnimalRescue.DataAccess.Mongodb.Query;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace AnimalRescue.DataAccess.Mongodb.Repositories
{
    internal class BlogRepository : IBlogRepository
	{
        private readonly IBaseCollection<Blog> baseCollection;

        public BlogRepository(IBaseCollection<Blog> baseCollection)
        {
            this.baseCollection = baseCollection;
        }

        public async Task<IList<Blog>> GetBlogsWithPagginationAsync(DbQuery query)
		{
			return await baseCollection.GetAsync(query);
		}

		public async Task<int> GetBlogsCountAsync(DbQuery query)
		{
			return await baseCollection.GetCountAsync(query);
		}
	}
}
