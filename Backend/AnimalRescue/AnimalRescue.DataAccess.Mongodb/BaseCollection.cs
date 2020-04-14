using AnimalRescue.DataAccess.Mongodb.Interfaces;
using AnimalRescue.DataAccess.Mongodb.Models.BaseItems;
using AnimalRescue.DataAccess.Mongodb.Query;
using AnimalRescue.DataAccess.Mongodb.QueryBuilders;
using AnimalRescue.Infrastructure.Validation;

using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Driver;

using System.Collections.Generic;
using System.Reflection;
using System.Threading.Tasks;

namespace AnimalRescue.DataAccess.Mongodb
{
    internal class BaseCollection<T> : IBaseCollection<T>
        where T : IBaseAuditItem
    {
        public IMongoCollection<T> Collection => collection;
        public IMongoCollection<BsonDocument> NativeCollection =>
            nativeCollection ?? (nativeCollection = database.GetCollection<BsonDocument>(collectionName));
        protected readonly IMongoDatabase database;
        protected readonly IMongoCollection<T> collection;
        protected IMongoCollection<BsonDocument> nativeCollection;
        protected readonly IQueryBuilder<T> queryBuilder;
        protected readonly string collectionName;

        public BaseCollection(
            IMongoDatabase database,
            IQueryBuilder<T> queryBuilder)
        {
            collectionName = typeof(T).GetCustomAttribute<BsonDiscriminatorAttribute>()?.Discriminator;

            Require.Strings.NotNullOrWhiteSpace(collectionName, nameof(collectionName));
            Require.Objects.NotNull(database, nameof(database));
            Require.Objects.NotNull(queryBuilder, nameof(queryBuilder));

            this.database = database;
            this.collection = database.GetCollection<T>(collectionName);
            this.queryBuilder = queryBuilder;
        }

        public async Task UpdateAsync(T instance) => await collection.ReplaceOneAsync(t => t.Id == instance.Id, instance);

        public virtual async Task<bool> DeleteAsync(string id)
        {
            var result = await collection.DeleteOneAsync(t => t.Id == id);
            return result.DeletedCount > 0;
        }

        public async Task<T> CreateAsync(T instance)
        {
            await collection.InsertOneAsync(instance);
            return instance;
        }
        public async Task<IEnumerable<T>> CreateAsync(IEnumerable<T> instances)
        {
            await collection.InsertManyAsync(instances);
            return instances;
        }
        public async Task CreateAsync(BsonDocument instance) => await NativeCollection.InsertOneAsync(instance);

        public async Task<List<T>> GetAsync(DbQuery query)
        {
            List<T> requestedCollection = await collection
                .Find(queryBuilder.FilterAsFilterDefinition(query.Filter))
                .Sort(queryBuilder.SortAsString(query.Sort))
                .Skip(query.Skip)
                .Limit(query.Size)
                .ToListAsync();

            return requestedCollection;
        }

        public async Task<int> GetCountAsync(DbQuery query)
        {
            long count = await collection
                .Find(queryBuilder.FilterAsFilterDefinition(query.Filter))
                .CountDocumentsAsync();

            return (int)count;
        }

        public async Task<T> GetAsync(string id)
        {
            var item = await collection
                .Find(x => x.Id == id)
                .SingleOrDefaultAsync();

            return item;
        }
    }
}
