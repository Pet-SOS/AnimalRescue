using AnimalRescue.Contracts.Common.Exceptions;
using AnimalRescue.DataAccess.Mongodb.Extensions;
using AnimalRescue.DataAccess.Mongodb.Interfaces;
using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Models;
using AnimalRescue.DataAccess.Mongodb.Query;
using AnimalRescue.Infrastructure.Validation;

using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using MongoDB.Driver;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

using common = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Common;
using condition = AnimalRescue.DataAccess.Mongodb.Extensions.FilterDefinitionExtensions;

namespace AnimalRescue.DataAccess.Mongodb.Repositories
{
    internal class TagRepository : ITagRepository
    {
        private readonly IBaseCollection<Tags> _baseCollection;

        public TagRepository(IBaseCollection<Tags> baseCollection)
        {
            Require.Objects.NotNull(baseCollection, nameof(baseCollection));

            _baseCollection = baseCollection;
        }

        public async Task<List<Tags>> GetAsync(DbQuery query)
        {
            return await _baseCollection.GetAsync(query);
        }

        public async Task<Tags> GetAsync(string id)
        {
            return await _baseCollection.GetAsync(id);
        }

        public async Task<Tags> CreateAsync(Tags tags)
        {
            Require.Objects.NotNull(tags, nameof(tags));

            tags.CreatedAt = DateTime.UtcNow;
            tags.Id = string.Empty;

            return await _baseCollection.CreateAsync(tags);
        }

        public async Task CreateAsync(IEnumerable<Tags> tags)
        {
            if (tags?.Count() == 0)
            {
                return;
            }

            tags =  tags.Select(x=> { x.Id = null; x.CreatedAt = DateTime.UtcNow; return x; });
            await _baseCollection.CreateAsync(tags);
        }

        public async Task UpdateAsync(Tags tags)
        {
            Require.Objects.NotNull(tags, nameof(tags));

            var oldTag = await _baseCollection.GetAsync(tags.Id);

            Require.Objects.NotNull<NotFoundException>(oldTag,
                () => $"{tags.Title} with id: {tags.Id} not found");

            oldTag.Title = tags.Title;
            oldTag.Type = tags.Type;

            await _baseCollection.UpdateAsync(oldTag);

        }

        public async Task DeleteAsync(string id)
        {
            Require.Strings.NotNullOrWhiteSpace(id, nameof(id));

            await _baseCollection.DeleteAsync(id);
        }

        public IAsyncEnumerable<Tags> GetAllItemsAsync()
        {
            throw new NotImplementedException();
        }

        public async Task<int> GetCountAsync(DbQuery query)
        {
            return await _baseCollection.GetCountAsync(query);
        }

        public async Task<List<Tags>> WhereAsync(List<Tags> tags)
        {
            List<BsonDocument> items = new List<BsonDocument>();
            FilterDefinition<BsonDocument> filter = condition.OR( 
                tags 
                .Select(x => condition.AND(common.Type.EQ(x.Type), common.Title.EQ(x.Title)))
                .ToArray());

            IAsyncCursor<BsonDocument> cursor = await _baseCollection.NativeCollection.FindAsync(filter);
            List<Tags> result = cursor.ToList().Select(x => x.Deserialize<Tags>()).ToList();

            return result;
        }

        public IAsyncEnumerator<Tags> GetAsyncEnumerator(CancellationToken cancellationToken = new CancellationToken())
        {
            throw new NotImplementedException();
        }
    }
}
