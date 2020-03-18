using AnimalRescue.Contracts.BusinessLogic.Models.Blogs;
using AnimalRescue.DataAccess.Mongodb.Extensions;
using AnimalRescue.DataAccess.Mongodb.Models;

using AutoMapper;

using System.Linq;

using static AnimalRescue.Contracts.Common.Constants.PropertyConstants;

namespace AnimalRescue.BusinessLogic.Configurations.MappingProfiles
{
    internal class ArticleMappingProfile : Profile
    {
        public ArticleMappingProfile()
        {
            CreateMap<Article, ArticleDto>()
                .ForMember(x => x.ImageIds, o => o.MapFrom(x => x.ImageIds.Select(ObjectIdExtensions.AsGuid)))
                .ForMember(x => x.Id, o => o.MapFrom(x => x.Id.AsGuid()));
            CreateMap<ArticleDto, Article>()
                .ForMember(x => x.ImageIds, o => o.MapFrom(x => x.ImageIds.Select(ObjectIdExtensions.AsObjectIdString)))
                .ForMember(x => x.Id, o => o.MapFrom(x => x.Id.AsObjectIdString()))
                .ForMember(x => x.Type, o => o.MapFrom(b => EntityType.Article))
                .ForMember(x => x.ModifiedBy, options => options.Ignore());
        }
    }
}
