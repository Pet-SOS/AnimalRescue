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
                .ForMember(x => x.LocationTypeId, o => o.MapFrom(x => x.LocationTypeId.AsGuid()))
                .ForMember(x => x.Id, o => o.MapFrom(x => x.Id.AsGuid()));
            CreateMap<AnimalDto, Animal>()
                .ForMember(x => x.LocationTypeId, o => o.MapFrom(x => x.LocationTypeId.AsObjectIdString()))
                .ForMember(x => x.ImageIds, o => o.MapFrom(x => x.ImageIds.Select(ObjectIdExtensions.AsObjectIdString)))
                .ForMember(x => x.Id, o => o.MapFrom(x => x.Id.AsObjectIdString()))
                .ForMember(x => x.ModifiedBy, options => options.Ignore())
                .ForMember(x => x.DateOfAdopted, options => options.Ignore())
                .ForMember(x => x.DateOfFound, options => options.Ignore());
        }
    }
}
