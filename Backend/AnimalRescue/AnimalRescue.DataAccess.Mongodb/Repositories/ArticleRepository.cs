using AnimalRescue.Contracts.Common.Constants;
using AnimalRescue.Contracts.Common.Exceptions;
using AnimalRescue.DataAccess.Mongodb.Interfaces;
using AnimalRescue.DataAccess.Mongodb.Models;
using AnimalRescue.Infrastructure.Validation;

using MongoDB.Driver;

using System.Linq;
using System.Threading.Tasks;

namespace AnimalRescue.DataAccess.Mongodb.Repositories
{
    internal class ArticleRepository :
        BaseRepository<Article>
    {
        public ArticleRepository(IBaseCollection<Article> baseCollection) : base(baseCollection)
        {
        }

        public override async Task<Article> CreateAsync(Article blog)
        {
            Require.Booleans.IsTrue(
                PropertyConstants.ArticleTypes().Any(x => x.Equals(blog.Type)),
                nameof(blog.Type));

            return await base.CreateAsync(blog);
        }

        public override async Task UpdateAsync(Article article)
        {
            Require.Objects.NotNull(article, nameof(article));

            var oldArticle = await base.GetAsync(article.Id);

            Require.Objects.NotNull<NotFoundException>(oldArticle,
                () => $"{article.Type} with id: {article.Id} not found");

            Require.Booleans.IsTrue<NotFoundException>(oldArticle.Type.Equals(article.Type),
                () => $"{article.Type} with id: {article.Id} not found");

            await base.UpdateAsync(article);
        }
    }
}
