using AnimalRescue.Contracts.BusinessLogic.Interfaces.CRUD;
using AnimalRescue.Contracts.BusinessLogic.Models.Blogs;

namespace AnimalRescue.Contracts.BusinessLogic.Interfaces
{
    public interface IArticleService :
        IBlCollectinQueryAsync<ArticleDto>,
        IBlOneItemQueryAsync<ArticleDto>,
        IBlCreateAsync<ArticleDto, ArticleDto>,
        IBlUpdateAsync<ArticleDto>,
        IBlDeleteAsync
    {
    }
}
