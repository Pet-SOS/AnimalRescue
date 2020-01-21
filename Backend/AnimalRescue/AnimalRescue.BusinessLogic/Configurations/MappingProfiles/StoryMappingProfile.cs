using AnimalRescue.Contracts.BusinessLogic.Models.Blogs;
using AnimalRescue.DataAccess.Mongodb.Models;

using AutoMapper;
using static AnimalRescue.Contracts.Common.Constants.PropertyConstants;

namespace AnimalRescue.BusinessLogic.Configurations.MappingProfiles
{
    internal class StoryMappingProfile : Profile
    {
        public StoryMappingProfile()
        {
            CreateMap<Article, StoryDto>();
            CreateMap<StoryDto, Article>()
                .ForMember(x => x.Type, o => o.MapFrom(b => EntityType.Story))
                .ForMember(x => x.ModifiedBy, options => options.Ignore());
        }
    }
}
