using AnimalRescue.Contracts.Common.Exceptions;
using AnimalRescue.DataAccess.Mongodb.Extensions;
using AnimalRescue.DataAccess.Mongodb.Interfaces;
using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Models;
using AnimalRescue.Infrastructure.Validation;

using MongoDB.Bson;
using MongoDB.Driver;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using common = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Common;
using condition = AnimalRescue.DataAccess.Mongodb.Extensions.FilterDefinitionExtensions;

namespace AnimalRescue.DataAccess.Mongodb.Repositories
{
    internal class TagRepository : BaseRepository<Tags>, ITagRepository
    {
        public TagRepository(IBaseCollection<Tags> baseCollection) : base(baseCollection)
        {
        }

        public override Task<Tags> CreateAsync(Tags tags)
        {
            Require.Objects.NotNull(tags, nameof(tags));

            tags.CreatedAt = DateTime.UtcNow;
            tags.Id = string.Empty;

            return baseCollection.CreateAsync(tags);
        }

        public async Task<IEnumerable<Tags>> CreateAsync(IEnumerable<Tags> tags)
        {
            if (tags == null || !tags.Any())
            {
                return new List<Tags>();
            }

            tags = tags.Select(x => { x.Id = null; x.CreatedAt = DateTime.UtcNow; return x; });
            return await baseCollection.CreateAsync(tags);
        }

        public override async Task UpdateAsync(Tags tags)
        {
            Require.Objects.NotNull(tags, nameof(tags));

            var oldTag = await baseCollection.GetAsync(tags.Id);

            Require.Objects.NotNull<NotFoundException>(oldTag,
                () => $"{tags.Title} with id: {tags.Id} not found");

            oldTag.Title = tags.Title;
            oldTag.Type = tags.Type;

            await baseCollection.UpdateAsync(oldTag);

        }

        public override async Task DeleteAsync(string id)
        {
            Require.Strings.NotNullOrWhiteSpace(id, nameof(id));

            await baseCollection.DeleteAsync(id);
        }

        public async Task<IEnumerable<Tags>> WhereAsync(IEnumerable<Tags> tags)
        {
            List<BsonDocument> items = new List<BsonDocument>();
            FilterDefinition<BsonDocument> filter = condition.OR(
                tags
                .Select(x => condition.AND(common.Type.EQ(x.Type), common.Title.EQ(x.Title)))
                .ToArray());

            IAsyncCursor<BsonDocument> cursor = await baseCollection.NativeCollection.FindAsync(filter);
            List<Tags> result = cursor.ToList().Select(x => x.Deserialize<Tags>()).ToList();

            return result;
        }
    }
}
