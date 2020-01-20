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
    internal class BlogTagRepository : IBlogTagRepository
    {
        private readonly IBaseCollection<BlogTag> _baseCollection;

        public BlogTagRepository(IBaseCollection<BlogTag> baseCollection)
        {
            Require.Objects.NotNull(baseCollection, nameof(baseCollection));

            _baseCollection = baseCollection;
        }

        public async Task<List<BlogTag>> GetAsync(DbQuery query)
        {
            return await _baseCollection.GetAsync(query);
        }

        public async Task<BlogTag> GetAsync(string id)
        {
            return await _baseCollection.GetAsync(id);
        }

        public async Task<BlogTag> CreateAsync(BlogTag blogTag)
        {
            Require.Objects.NotNull(blogTag, nameof(blogTag));

            blogTag.CreatedAt = DateTime.UtcNow;

            return await _baseCollection.CreateAsync(blogTag);
        }

        public async Task UpdateAsync(BlogTag blogTag)
        {
            Require.Objects.NotNull(blogTag, nameof(blogTag));

            var oldTag = await _baseCollection.GetAsync(blogTag.Id);

            Require.Objects.NotNull<NotFoundException>(oldTag,
                () => $"{blogTag.Title} with id: {blogTag.Id} not found");

            oldTag.Title = blogTag.Title;
            oldTag.Type = blogTag.Type;

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
