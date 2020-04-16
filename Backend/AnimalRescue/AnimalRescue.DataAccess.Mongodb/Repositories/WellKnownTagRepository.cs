using AnimalRescue.Contracts.Common.Exceptions;
using AnimalRescue.DataAccess.Mongodb.Extensions;
using AnimalRescue.DataAccess.Mongodb.Interfaces;
using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Models.Tag;
using AnimalRescue.DataAccess.Mongodb.Query;
using AnimalRescue.Infrastructure.Validation;

using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using MongoDB.Driver;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using common = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Common;
using condition = AnimalRescue.DataAccess.Mongodb.Extensions.FilterDefinitionExtensions;

namespace AnimalRescue.DataAccess.Mongodb.Repositories
{
    internal class WellKnownTagRepository : IWellKnownTagRepository
    {
        private readonly IBaseCollection<WellKnownTag> _baseCollection;

        public WellKnownTagRepository(IBaseCollection<WellKnownTag> baseCollection)
        {
            Require.Objects.NotNull(baseCollection, nameof(baseCollection));

            _baseCollection = baseCollection;
        }

        public async Task<List<WellKnownTag>> GetAsync(DbQuery query)
        {
            return await _baseCollection.GetAsync(query);
        }

        public async Task<WellKnownTag> GetAsync(string id)
        {
            return await _baseCollection.GetAsync(id);
        }

        public async Task<WellKnownTag> CreateAsync(WellKnownTag wellKnownTag)
        {
            Require.Objects.NotNull(wellKnownTag, nameof(wellKnownTag));

            wellKnownTag.CreatedAt = DateTime.UtcNow;

            if (string.IsNullOrWhiteSpace(wellKnownTag.Id))
            {
                wellKnownTag.Id = Guid.NewGuid().AsObjectIdString();
            }

            try
            {
                return await _baseCollection.CreateAsync(wellKnownTag);
            }
            catch (MongoWriteException)
            {
                throw new ForbiddenOperationRequestException($"The tag with the same id: '{wellKnownTag.Id}' exists already");
            }
        }

        public async Task CreateAsync(IEnumerable<WellKnownTag> wellKnownTag)
        {
            if (wellKnownTag?.Count() == 0)
            {
                return;
            }

            wellKnownTag = wellKnownTag.Select(x => { x.Id = null; x.CreatedAt = DateTime.UtcNow; return x; });
            await _baseCollection.CreateAsync(wellKnownTag);
        }

        public async Task UpdateAsync(WellKnownTag wellKnownTag)
        {
            Require.Objects.NotNull(wellKnownTag, nameof(wellKnownTag));

            var oldWellKnownTag = await _baseCollection.GetAsync(wellKnownTag.Id);

            Require.Objects.NotNull<NotFoundException>(oldWellKnownTag,
                () => $"{wellKnownTag.Code} with id: {wellKnownTag.Id} not found");

            oldWellKnownTag.Code = wellKnownTag.Code;
            oldWellKnownTag.KindOfAnimal = wellKnownTag.KindOfAnimal;

            await _baseCollection.UpdateAsync(oldWellKnownTag);

        }

        public async Task DeleteAsync(string id)
        {
            Require.Strings.NotNullOrWhiteSpace(id, nameof(id));

            await _baseCollection.DeleteAsync(id);
        }

        public async Task<int> GetCountAsync(DbQuery query)
        {
            return await _baseCollection.GetCountAsync(query);
        }

        public async Task<List<WellKnownTag>> WhereAsync(List<WellKnownTag> tags)
        {
            List<BsonDocument> items = new List<BsonDocument>();
            FilterDefinition<BsonDocument> filter = condition.OR(
                tags
                .Select(x => condition.AND(common.Type.EQ(x.KindOfAnimal), common.Title.EQ(x.Code)))
                .ToArray());

            IAsyncCursor<BsonDocument> cursor = await _baseCollection.NativeCollection.FindAsync(filter);
            List<WellKnownTag> result = cursor.ToList().Select(x => x.Deserialize<WellKnownTag>()).ToList();

            return result;
        }
    }
}
