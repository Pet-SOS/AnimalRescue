using AnimalRescue.DataAccess.Contracts.Query;
using AnimalRescue.DataAccess.Mongodb.Interfaces.Collections;
using AnimalRescue.DataAccess.Mongodb.Models;
using AnimalRescue.DataAccess.Mongodb.QueryBuilders;
using AnimalRescue.Infrastructure.Validation;

using AutoMapper;

using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Driver;

using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace AnimalRescue.DataAccess.Mongodb
{
    public abstract class BaseCollection<T> : IBaseCollection<T>
        where T : BaseItem
    {
        protected readonly IMongoCollection<T> collection;
        protected readonly IMapper mapper;
        protected readonly IQueryBuilder<T> queryBuilder;

        public BaseCollection(
            IMongoDatabase database, 
            IQueryBuilder<T> queryBuilder, 
            IMapper mapper)     
            : this(
                  database, 
                  queryBuilder, 
                  mapper, 
                  typeof(T).GetCustomAttribute<BsonDiscriminatorAttribute>()?.Discriminator)
        {
        }

        public BaseCollection(
            IMongoDatabase database, 
            IQueryBuilder<T> queryBuilder, 
            IMapper mapper, 
            string collectionName)
        {
            Require.Objects.NotNull(database, nameof(database));
            Require.Objects.NotNull(mapper, nameof(mapper));
            Require.Objects.NotNull(queryBuilder, nameof(queryBuilder));
            Require.Strings.NotNullOrWhiteSpace(collectionName, nameof(collectionName));

            collection = database.GetCollection<T>(collectionName);
            this.queryBuilder = queryBuilder;
            this.mapper = mapper;
        }

        protected List<Tout> ConvertListTo<Tout>(IList<T> items)
        {
            return mapper.Map<IList<T>, List<Tout>>(items);
        }
        protected List<Tout> ConvertListTo<Tout>(IAsyncCursor<T> items)
        {
            return mapper.Map<List<T>, List<Tout>>(items.ToList());
        }
        protected T ConvertOneFrom<TIn>(TIn item)
        {
            return mapper.Map<TIn, T>(item);
        }
        protected Tout ConvertOneTo<Tout>(T item)
        {
            return mapper.Map<T, Tout>(item);
        }
        protected Tout ConvertOneTo<Tout>(IAsyncCursor<T> item)
        {
            return ConvertOneTo<Tout>(item.FirstOrDefault());
        }

        public async Task<IAsyncCursor<T>> GetAsync() => await collection.FindAsync(t => true);
        public async Task<IAsyncCursor<T>> GetAsync(string id) => await collection.FindAsync(t => t.Id == id);
        public async Task<T> GetOneByIdAsync(string id) => (await GetAsync(id)).FirstOrDefault();

        public async Task<IAsyncCursor<T>> GetAsync(int currentPage, int pageSize) =>
             await collection.Find(x => true)
            .Skip((currentPage - 1) * pageSize)
            .Limit(pageSize)
            .ToCursorAsync();

        public async Task UpdateAsync(string id, T instance) => await collection.ReplaceOneAsync(t => t.Id == id, instance);
        public async Task UpdateAsync(T instance) => await collection.ReplaceOneAsync(t => t.Id == instance.Id, instance);
        public async Task RemoveAsync(T instance) => await collection.DeleteOneAsync(t => t.Id == instance.Id);
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
                .ToListAsync(); ;

            return requestedCollection;
        }

        public async Task<int> GetCountAsync(DbQuery query)
        {
            long count = await collection
                .Find(queryBuilder.FilterAsString(query.Filter))
                .CountDocumentsAsync();

            return (int)count;
        }
    }
}
