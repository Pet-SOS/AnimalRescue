using AnimalRescue.API.Models.Blogs.Articles;
using AnimalRescue.Contracts.BusinessLogic.Models.Blogs;

namespace AnimalRescue.API.Core.Configuration.MappingProfiles
{
    public class ArticleMappingProfile : ProfileMapper
    {
        public ArticleMappingProfile()
        {
            CreateMapFor<ArticleCreateModel, ArticleUpdateModel, ArticleInfoModel, ArticleDto>();
        }
    }
}
