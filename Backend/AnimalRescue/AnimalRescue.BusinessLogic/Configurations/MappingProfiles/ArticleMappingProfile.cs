using AnimalRescue.Contracts.BusinessLogic.Models.Blogs;
using AnimalRescue.DataAccess.Mongodb.Models;

using AutoMapper;

using static AnimalRescue.Contracts.Common.Constants.PropertyConstants;

namespace AnimalRescue.BusinessLogic.Configurations.MappingProfiles
{
    internal class ArticleMappingProfile : Profile
    {
        public ArticleMappingProfile()
        {
            CreateMap<Article, ArticleDto>();
            CreateMap<ArticleDto, Article>()
                .ForMember(x => x.Type, o => o.MapFrom(b => EntityType.Article))
                .ForMember(x => x.ModifiedBy, options => options.Ignore());
        }
    }
}
