using AnimalRescue.API.Core.Extensions;
using AnimalRescue.API.Models.Requests;
using AnimalRescue.Contracts.BusinessLogic.Models;
using AutoMapper;

namespace AnimalRescue.API.Core.Configuration.MappingProfiles
{
    public class RequestMappingProfile : Profile
    {
        public RequestMappingProfile()
        {
            CreateMap<RequestModel, RequestDto>();
            CreateMap<RequestDto, RequestModel>();

            CreateMap<RequestCreateUpdateModel, RequestModel>()
                .ForMember(x => x.Case, opt => opt.MapFrom(m => MappingProfileExtensions.GetWellKnownTagModel(m.Case)))
                .ForMember(x => x.Status, opt => opt.MapFrom(m => MappingProfileExtensions.GetWellKnownTagModel(m.Status)))
                .ForMember(x => x.AnimalState, opt => opt.MapFrom(m => MappingProfileExtensions.GetWellKnownTagModel(m.AnimalState)))
                .ForMember(x => x.PersonState, opt => opt.MapFrom(m => MappingProfileExtensions.GetWellKnownTagModel(m.PersonState)))
                .ForMember(x => x.KindOfAnimal, opt => opt.MapFrom(m => MappingProfileExtensions.GetWellKnownTagModel(m.KindOfAnimal)));

            CreateMap<RequestCreateUpdateModel, RequestDto>()
                .ForMember(x => x.Case, opt => opt.MapFrom(m => MappingProfileExtensions.GetWellKnownTagModel(m.Case)))
                .ForMember(x => x.Status, opt => opt.MapFrom(m => MappingProfileExtensions.GetWellKnownTagModel(m.Status)))
                .ForMember(x => x.AnimalState, opt => opt.MapFrom(m => MappingProfileExtensions.GetWellKnownTagModel(m.AnimalState)))
                .ForMember(x => x.PersonState, opt => opt.MapFrom(m => MappingProfileExtensions.GetWellKnownTagModel(m.PersonState)))
                .ForMember(x => x.KindOfAnimal, opt => opt.MapFrom(m => MappingProfileExtensions.GetWellKnownTagModel(m.KindOfAnimal)));

        }
    }
}
