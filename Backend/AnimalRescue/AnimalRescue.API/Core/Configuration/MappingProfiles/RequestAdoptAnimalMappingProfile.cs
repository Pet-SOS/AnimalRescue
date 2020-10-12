using AnimalRescue.API.Models.Messages;
using AnimalRescue.Contracts.BusinessLogic.Models.Messages;
using AutoMapper;

namespace AnimalRescue.API.Core.Configuration.MappingProfiles
{
    public class RequestAdoptAnimalMappingProfile : Profile
    {
        public RequestAdoptAnimalMappingProfile()
        {
            CreateMap<RequestAdoptAnimalModel, RequestAdoptAnimalDto>();
            CreateMap<RequestAdoptAnimalDto, RequestAdoptAnimalModel>();
        }
    }
}
