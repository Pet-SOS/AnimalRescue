using AnimalRescue.Contracts.BusinessLogic.Models.Tag;
using AnimalRescue.DataAccess.Mongodb.Models.BaseItems;
using AnimalRescue.DataAccess.Mongodb.Models.Tag;

using AutoMapper;

namespace AnimalRescue.BusinessLogic.Configurations.MappingProfiles
{
    internal class WellKnownTagMappingProfile : Profile
    {
        public WellKnownTagMappingProfile()
        {
            CreateMap<LanguageValue, LanguageValueDto>();
            CreateMap<LanguageValueDto, LanguageValue>();
            CreateMap<WellKnownTag, WellKnownTagDto>();
            CreateMap<WellKnownTagDto, WellKnownTag>();
        }
    }
}
