using AnimalRescue.API.Models.Tags;
using AnimalRescue.Contracts.BusinessLogic.Models.Tag;
using AutoMapper;

namespace AnimalRescue.API.Core.Configuration.MappingProfiles
{
    public class LanguageValueMappingProfile : Profile
    {
        public LanguageValueMappingProfile()
        {
            CreateMap<LanguageValueModel, LanguageValueDto>();
            CreateMap<LanguageValueDto, LanguageValueModel>();
        }
    }
}
