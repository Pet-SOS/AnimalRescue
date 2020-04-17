using AnimalRescue.Contracts.BusinessLogic.Models;
using AnimalRescue.DataAccess.Mongodb.Extensions;
using AnimalRescue.DataAccess.Mongodb.Models;

using AutoMapper;

namespace AnimalRescue.BusinessLogic.Configurations.MappingProfiles
{
    internal class LocationMappingProfile : Profile
    {
        public LocationMappingProfile()
        {
            CreateMap<Location, LocationDto>()
                .ForMember(x => x.Id, o => o.MapFrom(x => x.Id.AsGuid()));
            CreateMap<LocationDto, Location>()
                .ForMember(x => x.Id, o => o.MapFrom(x => x.Id.AsObjectIdString()));
        }
    }
}
