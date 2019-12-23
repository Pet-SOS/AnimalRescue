using AnimalRescue.DataAccess.Mongodb.Interfaces;
using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Models;
using AnimalRescue.DataAccess.Mongodb.Query;
using AnimalRescue.Infrastructure.Validation;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace AnimalRescue.DataAccess.Mongodb.Repositories
{
    internal class BlogRepository : IBlogRepository
	{
        private readonly IBaseCollection<Blog> baseCollection;

        public BlogRepository(IBaseCollection<Blog> baseCollection)
        {
            Require.Objects.NotNull(baseCollection, nameof(baseCollection));

            this.baseCollection = baseCollection;
        }

        public async Task<List<Blog>> GetAsync(DbQuery query)
		{
			return await baseCollection.GetAsync(query);
		}

		public async Task<int> GetCountAsync(DbQuery query)
		{
			return await baseCollection.GetCountAsync(query);
		}
	}
}
