using AnimalRescue.Contracts.BusinessLogic.Models.Blogs;
using AnimalRescue.DataAccess.Mongodb.Exceptions;
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
                .ForMember(x => x.ImageIds, o => o.MapFrom(x => x.ImageIds.Select(m => m.AsGuid())))
                .ForMember(x => x.Id, o => o.MapFrom(x => x.Id.AsGuid()));
            CreateMap<ArticleDto, Article>()
                .ForMember(x => x.ImageIds, o => o.MapFrom(x => x.ImageIds.Select(m => m.AsObjectIdString())))
                .ForMember(x => x.Id, o => o.MapFrom(x => x.Id.AsObjectIdString()))
                .ForMember(x => x.Type, o => o.MapFrom(b => EntityType.Article))
                .ForMember(x => x.ModifiedBy, options => options.Ignore());
        }
    }
}
