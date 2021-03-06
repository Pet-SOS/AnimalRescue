﻿using AnimalRescue.API.Models.Configurations;
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

            CreateMap<LanguagesConfigModel, LanguagesConfigDto>();
            CreateMap<LanguagesConfigDto, LanguagesConfigModel>();

            CreateMap<HowToHelpModel, HowToHelpDto>();
            CreateMap<HowToHelpDto, HowToHelpModel>();

            CreateMap<AboutModel, AboutDto>();
            CreateMap<AboutDto, AboutModel>();

            CreateMap<AboutFinancialReportsModel, AboutFinancialReportsDto>();
            CreateMap<AboutFinancialReportsDto, AboutFinancialReportsModel>();

            CreateMap<AboutRulesModel, AboutRulesDto>();
            CreateMap<AboutRulesDto, AboutRulesModel>();

            CreateMap<AdoptPopupModel, AdoptPopupDto>();
            CreateMap<AdoptPopupDto, AdoptPopupModel>();

            CreateMap<HomeModel, HomeDto>();
            CreateMap<HomeDto, HomeModel>();

            CreateMap<HelpPopupModel, HelpPopupDto>();
            CreateMap<HelpPopupDto, HelpPopupModel>();

            CreateMap<HowToAdoptModel, HowToAdoptDto>();
            CreateMap<HowToAdoptDto, HowToAdoptModel>();
        }
    }
}
