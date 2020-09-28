using AnimalRescue.Contracts.BusinessLogic.Models.Messages;
using AnimalRescue.DataAccess.Mongodb.Extensions;
using AnimalRescue.DataAccess.Mongodb.Models;
using AutoMapper;

namespace AnimalRescue.BusinessLogic.Configurations.MappingProfiles
{
    internal class RequestAdoptAnimalMappingProfile : Profile
    {
        public RequestAdoptAnimalMappingProfile()
        {
            CreateMap<RequestAdoptAnimal, RequestAdoptAnimalDto>()
                .ForMember(x => x.Id, o => o.MapFrom(x => x.Id.AsGuid()));

            CreateMap<RequestAdoptAnimalDto, RequestAdoptAnimal>()
                .ForMember(x => x.Id, o => o.MapFrom(x => x.Id.AsObjectId()));
        }
    }
}
