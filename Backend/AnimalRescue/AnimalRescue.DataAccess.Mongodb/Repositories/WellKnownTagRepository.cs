using AnimalRescue.Contracts.Common.Exceptions;
using AnimalRescue.DataAccess.Mongodb.Extensions;
using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Models.Tag;
using AnimalRescue.DataAccess.Mongodb.QueryBuilders;
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
    internal class WellKnownTagRepository :
        BaseCollection<WellKnownTag>, 
        IWellKnownTagRepository
    {
        public WellKnownTagRepository(IMongoDatabase database, IQueryBuilder<WellKnownTag> builder) : base(database, builder)
        {
        }

        public override async Task<WellKnownTag> CreateAsync(WellKnownTag wellKnownTag)
        {
            Require.Objects.NotNull(wellKnownTag, nameof(wellKnownTag));

            wellKnownTag.CreatedAt = DateTime.UtcNow;

            if (string.IsNullOrWhiteSpace(wellKnownTag.Id))
            {
                wellKnownTag.Id = Guid.NewGuid().AsObjectIdString();
            }

            try
            {
                return await base.CreateAsync(wellKnownTag);
            }
            catch (MongoWriteException)
            {
                throw new ForbiddenOperationRequestException($"The tag with the same id: '{wellKnownTag.Id}' exists already");
            }
        }

        public async Task<List<WellKnownTag>> WhereAsync(List<WellKnownTag> tags)
        {
            List<BsonDocument> items = new List<BsonDocument>();
            FilterDefinition<BsonDocument> filter = condition.OR(
                tags
                .Select(x => condition.AND(common.Type.EQ(x.KindOfAnimal), common.Title.EQ(x.Code)))
                .ToArray());

            IAsyncCursor<BsonDocument> cursor = await base.NativeCollection.FindAsync(filter);
            List<WellKnownTag> result = cursor.ToList().Select(x => x.Deserialize<WellKnownTag>()).ToList();

            return result;
        }
    }
}
