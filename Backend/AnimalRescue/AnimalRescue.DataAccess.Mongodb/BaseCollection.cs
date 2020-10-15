﻿using AnimalRescue.Contracts.Common.Exceptions;
using AnimalRescue.DataAccess.Mongodb.Extensions;
using AnimalRescue.DataAccess.Mongodb.Interfaces;
using AnimalRescue.DataAccess.Mongodb.Models.BaseItems;
using AnimalRescue.DataAccess.Mongodb.Query;
using AnimalRescue.DataAccess.Mongodb.QueryBuilders;
using AnimalRescue.Infrastructure.Helpers;
using AnimalRescue.Infrastructure.Validation;

using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Driver;
using MongoDB.Driver.Core.Bindings;
using MongoDB.Driver.Core.Operations;
using MongoDB.Driver.Core.WireProtocol.Messages.Encoders;

using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading;
using System.Threading.Tasks;

namespace AnimalRescue.DataAccess.Mongodb
{
    internal class BaseCollection<T> : IBaseCollection<T>
        where T : IBaseAuditItem
    {
        public IMongoCollection<T> Collection => collection;
        public IMongoCollection<BsonDocument> NativeCollection =>
            nativeCollection ??= database.GetCollection<BsonDocument>(collectionName);
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

        public virtual async Task UpdateAsync(T instance)
        {
            Require.Objects.NotNull(instance, nameof(instance));

            var oldItem = await GetAsync(instance.Id);

            Require.Objects.NotNull<NotFoundException>(oldItem,
                () => $"Instance with id: {instance.Id} not found");

            oldItem = oldItem.UpdateFrom(instance);

            await collection.ReplaceOneAsync(t => t.Id == instance.Id, oldItem);
        }

        public virtual async Task DeleteAsync(string id)
        {
            Require.Strings.NotNullOrWhiteSpace<BadRequestException>(
                id,
                "Id should not be null or white space");

            var result = await collection.DeleteOneAsync(t => t.Id == id);

            Require.Booleans.IsTrue<NotFoundException>(
                result.DeletedCount > 0,
                "Failed to delete document. Probably document is not found.");
        }

        public virtual async Task<T> CreateAsync(T instance)
        {
            Require.Objects.NotNull(instance, nameof(instance));
            if (instance.Id == "000000000000000000000000")
                instance.Id = string.Empty;

            instance.CreatedAt = DateHelper.GetUtc();

            await collection.InsertOneAsync(instance);

            return instance;
        }
        public virtual async Task<IEnumerable<T>> CreateAsync(IEnumerable<T> instances)
        {
            if (instances?.Count() == 0)
            {
                return Enumerable.Empty<T>();
            }

            var instanceList = instances.ToList();

            await collection.InsertManyAsync(instanceList);
            return instanceList;
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

        public async Task<BsonValue> ExecuteScriptAsync(string javascript)
        {
            var function = new BsonJavaScript(javascript);
            EvalOperation op = new EvalOperation(database.DatabaseNamespace, function, new MessageEncoderSettings{});

            using (var writeBinding = new WritableServerBinding(database.Client.Cluster, new CoreSessionHandle(NoCoreSession.Instance)))
            {
                var result = await op.ExecuteAsync(writeBinding, CancellationToken.None);
                return result;
            }
        }

        public async IAsyncEnumerable<T> GetAllItemsAsync()
        {
            var filter = Builders<T>.Filter.Empty;

            using IAsyncCursor<T> cursor = await collection.FindAsync(filter);

            while (await cursor.MoveNextAsync())
            {
                foreach (T current in cursor.Current)
                {
                    yield return current;
                }
            }
        }
    }
}
