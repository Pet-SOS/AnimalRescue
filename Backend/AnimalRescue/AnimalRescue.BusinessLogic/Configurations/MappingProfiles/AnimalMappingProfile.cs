using AnimalRescue.Contracts.BusinessLogic.Models;
using AnimalRescue.DataAccess.Mongodb.Extensions;
using AnimalRescue.DataAccess.Mongodb.Models;
using AutoMapper;
using System.Linq;

namespace AnimalRescue.BusinessLogic.Configurations.MappingProfiles
{
    internal class AnimalMappingProfile : Profile
    {
        public AnimalMappingProfile()
        {
            CreateMap<Animal, AnimalDto>()
                .ForMember(x => x.ImageIds, o => o.MapFrom(x => x.ImageIds.Select(ObjectIdExtensions.AsGuid)))
                .ForMember(x => x.Id, o => o.MapFrom(x => x.Id.AsGuid()))
                .ForMember(x => x.Status, o => o.MapFrom(x => x.Status.Id.AsGuid()))
                .ForMember(x => x.LocationType, o => o.MapFrom(x => x.LocationType.Id.AsGuid()))
                .ForMember(x => x.LocationName, o => o.MapFrom(x => x.LocationName.Id.AsGuid()));
            CreateMap<AnimalDto, Animal>()
                .ForMember(x => x.ImageIds, o => o.MapFrom(x => x.ImageIds.Select(ObjectIdExtensions.AsObjectIdString)))
                .ForMember(x => x.Id, o => o.MapFrom(x => x.Id.AsObjectIdString()))
                .ForMember(x => x.ModifiedBy, options => options.Ignore())
                .ForMember(x => x.DateOfAdopted, options => options.Ignore())
                .ForMember(x => x.DateOfFound, options => options.Ignore())
                .ForMember(x => x.Status, options => options.Ignore())
                .ForMember(x => x.LocationType, options => options.Ignore())
                .ForMember(x => x.LocationName, options => options.Ignore());
        }
    }
}
