using AnimalRescue.Contracts.Common.Exceptions;
using AnimalRescue.DataAccess.Mongodb.Extensions;
using AnimalRescue.DataAccess.Mongodb.Interfaces;
using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Models.Tag;
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
    internal class TagLargeRepository :
        BaseRepository<TagLarge>,
        ITagLargeRepository
    {
        public TagLargeRepository(IBaseCollection<TagLarge> baseCollection) : base(baseCollection)
        {
        }

        public override async Task<TagLarge> CreateAsync(TagLarge tagLarge)
        {
            Require.Objects.NotNull(tagLarge, nameof(tagLarge));

            tagLarge.CreatedAt = DateTime.UtcNow;

            if (string.IsNullOrWhiteSpace(tagLarge.Id))
            {
                tagLarge.Id = Guid.NewGuid().AsObjectIdString();
            }

            try
            {
                return await base.CreateAsync(tagLarge);
            }
            catch (MongoWriteException)
            {
                throw new ForbiddenOperationRequestException($"The tag with the same id: '{tagLarge.Id}' exists already");
            }
        }

        public Task<IEnumerable<TagLarge>> CreateAsync(IEnumerable<TagLarge> value) => baseCollection.CreateAsync(value);

        public async Task<List<TagLarge>> WhereAsync(List<TagLarge> tags)
        {
            List<BsonDocument> items = new List<BsonDocument>();
            FilterDefinition<BsonDocument> filter = condition.OR(
                tags
                .Select(x => common.Title.EQ(x.Code))
                .ToArray());

            IAsyncCursor<BsonDocument> cursor = await baseCollection.NativeCollection.FindAsync(filter);
            List<TagLarge> result = cursor.ToList().Select(x => x.Deserialize<TagLarge>()).ToList();

            return result;
        }

        public async Task<List<TagLarge>> WhereByIdAsync(List<TagLarge> tags)
        {
            var tasks = tags
                .Select(async x => await base.GetAsync(x.Id))
                .ToArray();

            await Task.WhenAll(tasks);
            var result = tasks.Select(x => x.Result).Where(x => x != null).ToList();
            
            return result;
        }
    }
}
