using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Models;

using MongoDB.Driver;
using System.Collections.Generic;
using System.Threading.Tasks;

using AnimalRescue.DataAccess.Mongodb.Extensions;

using MongoDB.Bson;
using MongoDB.Bson.Serialization;

using System;
using System.Linq;

using common = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Common;
using condition = AnimalRescue.DataAccess.Mongodb.Extensions.FilterDefinitionExtensions;
using AnimalRescue.DataAccess.Mongodb.Interfaces;

namespace AnimalRescue.DataAccess.Mongodb.Repositories
{
	internal class UserRoleActionRepository : 
		BaseRepository<UserRoleAction>,	  
		IUserRoleActionRepository
	{
        public UserRoleActionRepository(IBaseCollection<UserRoleAction> baseCollection) : base(baseCollection)
        {
        }

        public Task<IEnumerable<UserRoleAction>> CreateAsync(IEnumerable<UserRoleAction> value) => baseCollection.CreateAsync(value);

        public async Task<List<UserRoleAction>> WhereAsync(List<UserRoleAction> userRoleActions)
		{
			List<BsonDocument> items = new List<BsonDocument>();
			FilterDefinition<BsonDocument> filter = condition.OR(userRoleActions
				.Select(x => condition.AND(common.Type.EQ(x.UserRole), common.Title.EQ(x.Action))).ToArray());

			IAsyncCursor<BsonDocument> cursor = await baseCollection.NativeCollection.FindAsync(filter);
			List<UserRoleAction> result = cursor.ToList().Select(x => x.Deserialize<UserRoleAction>()).ToList();

			return result;
		}

		public async Task<List<UserRoleAction>> WhereByIdAsync(List<UserRoleAction> actions)
		{
			var tasks = actions
				.Select(async x => await base.GetAsync(x.Id))
				.ToArray();

			await Task.WhenAll(tasks);
			var result = tasks.Select(x => x.Result).Where(x => x != null).ToList();

			return result;
		}
	}
}
