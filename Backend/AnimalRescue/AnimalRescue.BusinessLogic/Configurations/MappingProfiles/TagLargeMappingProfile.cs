using AnimalRescue.Contracts.BusinessLogic.Models.Tag;
using AnimalRescue.DataAccess.Mongodb.Models.Tag;

using AutoMapper;

namespace AnimalRescue.BusinessLogic.Configurations.MappingProfiles
{
    internal class TagLargeMappingProfile : Profile
    {
        public TagLargeMappingProfile()
        {
            CreateMap<LanguageValue, LanguageValueDto>();
            CreateMap<LanguageValueDto, LanguageValue>();
            CreateMap<TagLarge, TagLargeDto>();
            CreateMap<TagLargeDto, TagLarge>();
        }
    }
}
