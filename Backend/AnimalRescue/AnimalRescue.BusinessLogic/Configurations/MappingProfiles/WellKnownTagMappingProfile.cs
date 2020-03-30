using AnimalRescue.Contracts.BusinessLogic.Models.Tag;
using AnimalRescue.DataAccess.Mongodb.Extensions;
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
            CreateMap<WellKnownTag, WellKnownTagDto>()
                .ForMember(x => x.Id, o => o.MapFrom(x => x.Id.AsGuid()));
            CreateMap<WellKnownTagDto, WellKnownTag>()
                .ForMember(x => x.Id, o => o.MapFrom(x => x.Id.AsObjectIdString()));
        }
    }
}
