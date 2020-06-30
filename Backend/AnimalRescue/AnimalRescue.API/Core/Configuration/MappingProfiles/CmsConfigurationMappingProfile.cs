using AnimalRescue.API.Core.Extensions;
using AnimalRescue.API.Models.Configurations;
using AnimalRescue.API.Models.Configurations.Contacts;
using AnimalRescue.API.Models.Configurations.Info;
using AnimalRescue.Contracts.BusinessLogic.Models.Configurations;
using AnimalRescue.Contracts.BusinessLogic.Models.Configurations.Info;
using AutoMapper;
using System;

namespace AnimalRescue.API.Core.Configuration.MappingProfiles
{
    public class CmsConfigurationMappingProfile : Profile
    {
        public CmsConfigurationMappingProfile()
        {
            CreateMap<CmsConfigurationModel, CmsConfigurationDto>();
            CreateMap<CmsConfigurationDto, CmsConfigurationModel>();

            CreateMap<HelpAdoptModel, HelpAdoptDto>();
            CreateMap<HelpAdoptDto, HelpAdoptModel>();

            CreateMap<HelpPopupModel, HelpPopupDto>();
            CreateMap<HelpPopupDto, HelpPopupModel>();

            CreateMap<GetHomePopupModel, GetHomePopupDto>();
            CreateMap<GetHomePopupDto, GetHomePopupModel>();

            CreateMap<LanguagesConfigModel, LanguagesConfigDto>();
            CreateMap<LanguagesConfigDto, LanguagesConfigModel>();

            CreateMap<GetHomePopupModel, GetHomePopupDto>()
                .ForMember(x => x.Title, opt => opt.MapFrom(m => MappingProfileExtensions.CreateTagLargeDto(m.Title)))
                .ForMember(x => x.Text, opt => opt.MapFrom(m => MappingProfileExtensions.CreateTagLargeDto(m.Text)));
            CreateMap<GetHomePopupDto, GetHomePopupModel>();
        }
    }
}
