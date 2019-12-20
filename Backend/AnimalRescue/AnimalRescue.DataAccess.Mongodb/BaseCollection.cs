using AnimalRescue.DataAccess.Mongodb.Interfaces;
using AnimalRescue.DataAccess.Mongodb.Models;
using AnimalRescue.DataAccess.Mongodb.Query;
using AnimalRescue.DataAccess.Mongodb.QueryBuilders;
using AnimalRescue.Infrastructure.Validation;

using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Driver;

using System.Collections.Generic;
using System.Reflection;
using System.Threading.Tasks;

namespace AnimalRescue.DataAccess.Mongodb
{
    internal class BaseCollection<T> : IBaseCollection<T>
        where T : BaseItem
    {
        public IMongoCollection<T> Collection => collection;
        protected readonly IMongoCollection<T> collection;
        protected readonly IQueryBuilder<T> queryBuilder;

        public BaseCollection(
            IMongoDatabase database, 
            IQueryBuilder<T> queryBuilder)     
        {
            var collectionName = typeof(T).GetCustomAttribute<BsonDiscriminatorAttribute>()?.Discriminator;
            
            Require.Strings.NotNullOrWhiteSpace(collectionName, nameof(collectionName));
            Require.Objects.NotNull(database, nameof(database));
            Require.Objects.NotNull(queryBuilder, nameof(queryBuilder));

            this.collection = database.GetCollection<T>(collectionName);
            this.queryBuilder = queryBuilder;
        }

        public async Task UpdateAsync(T instance) => await collection.ReplaceOneAsync(t => t.Id == instance.Id, instance);
        public async Task RemoveAsync(string id) => await collection.DeleteOneAsync(t => t.Id == id);
        public async Task<T> CreateAsync(T instance)
        {
            await collection.InsertOneAsync(instance);
            return instance;
        }

        public async Task<List<T>> GetAsync(DbQuery query)
        {
            List<T> requestedCollection = await collection
                .Find(queryBuilder.FilterAsString(query.Filter))
                .Sort(queryBuilder.SortAsString(query.Sort))
                .Skip(query.Skip)
                .Limit(query.Size)
                .ToListAsync();

            return requestedCollection;
        }

        public async Task<int> GetCountAsync(DbQuery query)
        {
            long count = await collection
                .Find(queryBuilder.FilterAsString(query.Filter))
                .CountDocumentsAsync();

            return (int)count;
        }

        public async Task<T> GetAsync(string id)
        {
            var item = await collection
                .Find(x=>x.Id == id)
                .FirstOrDefaultAsync();

            return item;
        }
    }
}
