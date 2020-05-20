using AnimalRescue.API.Core.Extensions;
using AnimalRescue.API.Models.Animals;
using AnimalRescue.Contracts.BusinessLogic.Models;
using AutoMapper;

namespace AnimalRescue.API.Core.Configuration.MappingProfiles
{
    public class AnimalMappingProfile : Profile
    {
        public AnimalMappingProfile()
        {
            CreateMap<AnimalModel, AnimalDto>();
            CreateMap<AnimalDto, AnimalModel>();

            CreateMap<AnimalCreateUpdateModel, AnimalModel>()
                .ForMember(x => x.Tags, opt => opt.MapFrom(m => MappingProfileExtensions.StringSeparatedSemicolomnToList(m.Tags)))
                .ForMember(x => x.Status, opt => opt.MapFrom(m => MappingProfileExtensions.GetWellKnownTagModel(m.Status)));

            CreateMap<AnimalCreateUpdateModel, AnimalDto>()
                .ForMember(x => x.Tags, opt => opt.MapFrom(m => MappingProfileExtensions.StringSeparatedSemicolomnToList(m.Tags)));
        }
    }
}
