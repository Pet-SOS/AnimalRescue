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
    internal class BlogRepository : IBlogRepository
	{
        private readonly IBaseCollection<Blog> _baseCollection;

        public BlogRepository(IBaseCollection<Blog> baseCollection)
        {
            Require.Objects.NotNull(baseCollection, nameof(baseCollection));

			_baseCollection = baseCollection;
        }

		public async Task<Blog> CreateAsync(Blog blog)
		{
			Require.Objects.NotNull(blog, nameof(blog));

			blog.CreatedAt = DateTimeOffset.Now;

			return await _baseCollection.CreateAsync(blog);
		}

		public async Task DeleteAsync(string id)
		{
			Require.Strings.NotNullOrWhiteSpace(id, nameof(id));

			await _baseCollection.RemoveAsync(id);
		}

		public async Task<List<Blog>> GetAsync(DbQuery query)
		{
			return await _baseCollection.GetAsync(query);
		}

		public async Task<Blog> GetAsync(string id)
		{
			return await _baseCollection.GetAsync(id);
		}

		public async Task<int> GetCountAsync(DbQuery query)
		{
			return await _baseCollection.GetCountAsync(query);
		}

		public async Task UpdateAsync(Blog blog)
		{
			Require.Objects.NotNull(blog, nameof(blog));

			var existingBlog = await _baseCollection.GetAsync(blog.Id);

			Require.Objects.NotNull<NotFoundException>(existingBlog, () => $"Blog with id: {blog.Id} not found");

			existingBlog.Body = blog.Body;
			existingBlog.Description = blog.Description;
			existingBlog.ImageIds = blog.ImageIds;
			existingBlog.ModifiedAt = DateTimeOffset.Now;

			await _baseCollection.UpdateAsync(existingBlog);
		}
	}
}
