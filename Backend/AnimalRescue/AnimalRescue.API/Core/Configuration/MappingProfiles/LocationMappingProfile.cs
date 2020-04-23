using AnimalRescue.API.Core.Extensions;
using AnimalRescue.API.Models.Locations;
using AnimalRescue.Contracts.BusinessLogic.Models;
using AutoMapper;

namespace AnimalRescue.API.Core.Configuration.MappingProfiles
{
    public class LocationMappingProfile : Profile
    {
        public LocationMappingProfile()
        {
            CreateMap<LocationCreateUpdateModel, LocationModel>()
                .ForMember(x => x.Type, opt => opt.MapFrom(m => MappingProfileExtensions.GetWellKnownTagModel(m.Type)));
            
            CreateMap<LocationModel, LocationDto>();
            CreateMap<LocationDto, LocationModel>();
        }
    }
}
