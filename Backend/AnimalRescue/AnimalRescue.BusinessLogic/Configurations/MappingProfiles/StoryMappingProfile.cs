using AnimalRescue.Contracts.BusinessLogic.Models;
using AnimalRescue.DataAccess.Mongodb.Models;

using AutoMapper;

namespace AnimalRescue.BusinessLogic.Configurations.MappingProfiles
{
    internal class StoryMappingProfile : Profile
    {
        public StoryMappingProfile()
        {
            CreateMap<Story, StoryDto>();
            CreateMap<StoryDto, Story>()
                .ForMember(x => x.ModifiedBy, options => options.Ignore());
        }
    }
}
