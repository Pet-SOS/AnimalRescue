using AnimalRescue.Contracts.Common.Constants;
using AnimalRescue.Contracts.Common.Exceptions;
using AnimalRescue.DataAccess.Mongodb.Interfaces;
using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Models;
using AnimalRescue.DataAccess.Mongodb.Query;
using AnimalRescue.Infrastructure.Validation;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AnimalRescue.DataAccess.Mongodb.Repositories
{
	internal class ArticleRepository : IArticleRepository
	{
        private readonly IBaseCollection<Article> _baseCollection;

        public ArticleRepository(IBaseCollection<Article> baseCollection)
        {
            Require.Objects.NotNull(baseCollection, nameof(baseCollection));

			_baseCollection = baseCollection;
        }

		public async Task<Article> CreateAsync(Article blog)
		{
			Require.Objects.NotNull(blog, nameof(blog));
			Require.Booleans.IsTrue(
				PropertyConstants.ArticleTypes().Any(x => x.Equals(blog.Type)),
				nameof(blog.Type));

			blog.CreatedAt = DateTimeOffset.Now;

			return await _baseCollection.CreateAsync(blog);
		}

		public async Task DeleteAsync(string id)
		{
			Require.Strings.NotNullOrWhiteSpace(id, nameof(id));

			await _baseCollection.RemoveAsync(id);
		}

		public async Task<List<Article>> GetAsync(DbQuery query)
		{
			return await _baseCollection.GetAsync(query);
		}

		public async Task<Article> GetAsync(string id)
		{
			return await _baseCollection.GetAsync(id);
		}

		public async Task<int> GetCountAsync(DbQuery query)
		{
			return await _baseCollection.GetCountAsync(query);
		}

		public async Task UpdateAsync(Article article)
		{
			Require.Objects.NotNull(article, nameof(article));

			var oldArticle = await _baseCollection.GetAsync(article.Id);

			Require.Objects.NotNull<NotFoundException>(oldArticle, 
				() => $"{article.Type} with id: {article.Id} not found");

			Require.Booleans.IsTrue<NotFoundException>(oldArticle.Type.Equals(article.Type), 
				() => $"{article.Type} with id: {article.Id} not found");

			oldArticle.Body = article.Body;
			oldArticle.Title = article.Title;
			oldArticle.ImageIds.AddRange(article.ImageIds);
			oldArticle.Tags = article.Tags;
			oldArticle.IsRescued = article.IsRescued;
			oldArticle.ModifiedAt = DateTimeOffset.Now;

			await _baseCollection.UpdateAsync(oldArticle);
		}
	}
}
