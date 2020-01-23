using AnimalRescue.Contracts.Common.Exceptions;
using AnimalRescue.DataAccess.Mongodb.Interfaces;
using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Models;
using AnimalRescue.DataAccess.Mongodb.Query;
using AnimalRescue.Infrastructure.Validation;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

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

            return await _baseCollection.CreateAsync(tags);
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

            await _baseCollection.RemoveAsync(id);
        }

        public async Task<int> GetCountAsync(DbQuery query)
        {
            return await _baseCollection.GetCountAsync(query);
        }
    }
}
