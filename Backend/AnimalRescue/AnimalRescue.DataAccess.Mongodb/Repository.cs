using AnimalRescue.DataAccess.Mongodb.Configurations;
using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Models;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Reflection;
using System.Threading.Tasks;

namespace AnimalRescue.DataAccess.Mongodb
{
	public abstract class Repository<T> : IBaseRepository<T> where T : BaseItem
	{
		protected IMongoClient client;
		protected IMongoDatabase database;
		protected IMongoCollection<T> collection;

		public Repository(IMongoClient client, IMongoDbSettings settings)
		{
			this.client = client;

			database = client.GetDatabase(settings.DatabaseName);

			collection = database.GetCollection<T>(typeof(T).GetCustomAttribute<BsonDiscriminatorAttribute>().Discriminator);
		}

		public async Task<T> CreateAsync(T instance)
		{
			await collection.InsertOneAsync(instance);

			return instance;
		}

		public async Task<List<T>> GetAsync()
		{
			return await collection.Find(t => true).ToListAsync();
		}

		public async Task<T> GetAsync(string id)
		{
			return await collection.Find(t => t.Id == id).FirstOrDefaultAsync();
		}

		public virtual async Task<List<T>> GetAsync(int pageNumber, int pageSize, Expression<Func<T, object>> sortFrield)
		{
			return await collection.Find(x => true)
				.SortByDescending(sortFrield)
				.Skip((pageNumber - 1) * pageSize)
				.Limit(pageSize)
				.ToListAsync();
		}

		public async Task RemoveAsync(T instance)
		{
			await collection.DeleteOneAsync(t => t.Id == instance.Id);
		}

		public async Task RemoveAsync(string id)
		{
			await collection.DeleteOneAsync(t => t.Id == id);
		}

		public async Task UpdateAsync(string id, T instance)
		{
			await collection.ReplaceOneAsync(t => t.Id == id, instance);
		}
	}
}
