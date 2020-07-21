using AnimalRescue.API.Models.Configurations;
using AnimalRescue.API.Models.Configurations.Contacts;
using AnimalRescue.API.Models.Configurations.Info;
using AnimalRescue.Contracts.BusinessLogic.Models.Configurations;
using AnimalRescue.Contracts.BusinessLogic.Models.Configurations.Info;

using AutoMapper;

namespace AnimalRescue.API.Core.Configuration.MappingProfiles
{
    public class CmsConfigurationMappingProfile : Profile
    {
        public CmsConfigurationMappingProfile()
        {
            CreateMap<ParagraphModel, ParagraphDto>();
            CreateMap<ParagraphDto, ParagraphModel>();

            CreateMap<CmsConfigurationModel, CmsConfigurationDto>();
            CreateMap<CmsConfigurationDto, CmsConfigurationModel>();

            CreateMap<HelpAdoptModel, HelpAdoptDto>();
            CreateMap<HelpAdoptDto, HelpAdoptModel>();

            CreateMap<HelpPopupModel, HelpPopupDto>();
            CreateMap<HelpPopupDto, HelpPopupModel>();

            CreateMap<HomePopupModel, HomePopupDto>();
            CreateMap<HomePopupDto, HomePopupModel>();

            CreateMap<LanguagesConfigModel, LanguagesConfigDto>();
            CreateMap<LanguagesConfigDto, LanguagesConfigModel>();

            CreateMap<HomePopupModel, HomePopupDto>();
            CreateMap<HomePopupDto, HomePopupModel>();
        }
    }
}
