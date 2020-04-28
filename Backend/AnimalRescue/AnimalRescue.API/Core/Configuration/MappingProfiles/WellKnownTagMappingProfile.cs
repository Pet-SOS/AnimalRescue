using AnimalRescue.API.Models.Tags;
using AnimalRescue.Contracts.BusinessLogic.Models.Tag;
using AutoMapper;

namespace AnimalRescue.API.Core.Configuration.MappingProfiles
{
    public class WellKnownTagMappingProfile : Profile
    {
        public WellKnownTagMappingProfile()
        {
            CreateMap<WellKnownTagModel, WellKnownTagDto>();
            CreateMap<WellKnownTagDto, WellKnownTagModel>();
            CreateMap<WellKnownTagCreateUpdateModel, WellKnownTagDto>();
            CreateMap<WellKnownTagCreateUpdateModel, WellKnownTagDto>();
        }
    }
}
