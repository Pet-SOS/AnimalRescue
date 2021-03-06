﻿using AnimalRescue.Contracts.BusinessLogic.Models.Configurations;
using AnimalRescue.Contracts.BusinessLogic.Models.Configurations.Info;
using AnimalRescue.DataAccess.Mongodb.Extensions;
using AnimalRescue.DataAccess.Mongodb.Models.Configurations;
using AnimalRescue.DataAccess.Mongodb.Models.Configurations.Nested;
using AnimalRescue.DataAccess.Mongodb.Models.Configurations.Nested.Info;

using AutoMapper;

namespace AnimalRescue.BusinessLogic.Configurations.MappingProfiles
{
    internal class CmsConfigurationMappingProfile : Profile
    {
        public CmsConfigurationMappingProfile()
        {
            CreateMap<Paragraph, ParagraphDto>();
            CreateMap<ParagraphDto, Paragraph>();

            CreateMap<Configuration<Contacts>, CmsConfigurationDto>()
                .ForMember(x => x.Id, o => o.MapFrom(x => x.Id.AsGuid()))
                .ForMember(x => x.Addresses, o => o.MapFrom(cms => cms.Data.Addresses))
                .ForMember(x => x.Emails, o => o.MapFrom(cms => cms.Data.Emails))
                .ForMember(x => x.Phones, o => o.MapFrom(cms => cms.Data.Phones))
                .ForMember(x => x.Paragraphs, o => o.MapFrom(cms => cms.Data.Paragraphs))
                .ForMember(x => x.SocialLinks, o => o.MapFrom(cms => cms.Data.SocialLinks));

            CreateMap<CmsConfigurationDto, Configuration<Contacts>>()
                .ForMember(x => x.Id, o => o.MapFrom(x => x.Id.AsObjectIdString()))
                .ForPath(x => x.Data.Addresses, o => o.MapFrom(cms => cms.Addresses))
                .ForPath(x => x.Data.Emails, o => o.MapFrom(cms => cms.Emails))
                .ForPath(x => x.Data.Phones, o => o.MapFrom(cms => cms.Phones))
                .ForPath(x => x.Data.Paragraphs, o => o.MapFrom(cms => cms.Paragraphs))
                .ForPath(x => x.Data.SocialLinks, o => o.MapFrom(cms => cms.SocialLinks));

            CreateMap<Configuration<HowToHelp>, HowToHelpDto>()
                .ForMember(x => x.Id, o => o.MapFrom(config => config.Id.AsGuid()))
                .ForPath(x => x.Paragraphs, o => o.MapFrom(config => config.Data.Paragraphs));
            CreateMap<HowToHelpDto, Configuration<HowToHelp>>()
                .ForMember(x => x.Id, o => o.MapFrom(config => config.Id.AsObjectIdString()))
                .ForPath(x => x.Data.Paragraphs, o => o.MapFrom(config => config.Paragraphs));

            CreateMap<Configuration<About>, AboutDto>()
                .ForMember(x => x.Id, o => o.MapFrom(config => config.Id.AsGuid()))
                .ForPath(x => x.Paragraphs, o => o.MapFrom(config => config.Data.Paragraphs));
            CreateMap<AboutDto, Configuration<About>>()
                .ForMember(x => x.Id, o => o.MapFrom(config => config.Id.AsObjectIdString()))
                .ForPath(x => x.Data.Paragraphs, o => o.MapFrom(config => config.Paragraphs));

            CreateMap<Configuration<AboutFinancialReports>, AboutFinancialReportsDto>()
                .ForMember(x => x.Id, o => o.MapFrom(config => config.Id.AsGuid()))
                .ForPath(x => x.Paragraphs, o => o.MapFrom(config => config.Data.Paragraphs));
            CreateMap<AboutFinancialReportsDto, Configuration<AboutFinancialReports>>()
                .ForMember(x => x.Id, o => o.MapFrom(config => config.Id.AsObjectIdString()))
                .ForPath(x => x.Data.Paragraphs, o => o.MapFrom(config => config.Paragraphs));

            CreateMap<Configuration<AboutRules>, AboutRulesDto>()
                .ForMember(x => x.Id, o => o.MapFrom(config => config.Id.AsGuid()))
                .ForPath(x => x.Paragraphs, o => o.MapFrom(config => config.Data.Paragraphs));
            CreateMap<AboutRulesDto, Configuration<AboutRules>>()
                .ForMember(x => x.Id, o => o.MapFrom(config => config.Id.AsObjectIdString()))
                .ForPath(x => x.Data.Paragraphs, o => o.MapFrom(config => config.Paragraphs));

            CreateMap<Configuration<AdoptPopup>, AdoptPopupDto>()
                .ForMember(x => x.Id, o => o.MapFrom(config => config.Id.AsGuid()))
                .ForPath(x => x.Paragraphs, o => o.MapFrom(config => config.Data.Paragraphs));
            CreateMap<AdoptPopupDto, Configuration<AdoptPopup>>()
                .ForMember(x => x.Id, o => o.MapFrom(config => config.Id.AsObjectIdString()))
                .ForPath(x => x.Data.Paragraphs, o => o.MapFrom(config => config.Paragraphs));

            CreateMap<Configuration<Home>, HomeDto>()
                .ForMember(x => x.Id, o => o.MapFrom(config => config.Id.AsGuid()))
                .ForPath(x => x.Paragraphs, o => o.MapFrom(config => config.Data.Paragraphs));
            CreateMap<HomeDto, Configuration<Home>>()
                .ForMember(x => x.Id, o => o.MapFrom(config => config.Id.AsObjectIdString()))
                .ForPath(x => x.Data.Paragraphs, o => o.MapFrom(config => config.Paragraphs));

            CreateMap<Configuration<HelpPopup>, HelpPopupDto>()
                .ForMember(x => x.Id, o => o.MapFrom(config => config.Id.AsGuid()))
                .ForPath(x => x.Paragraphs, o => o.MapFrom(config => config.Data.Paragraphs));

            CreateMap<HelpPopupDto, Configuration<HelpPopup>>()
                .ForMember(x => x.Id, o => o.MapFrom(config => config.Id.AsObjectIdString()))
                .ForPath(x => x.Data.Paragraphs, o => o.MapFrom(config => config.Paragraphs));

            CreateMap<Configuration<HowToAdopt>, HowToAdoptDto>()
               .ForMember(x => x.Id, o => o.MapFrom(config => config.Id.AsGuid()))
               .ForPath(x => x.Paragraphs, o => o.MapFrom(config => config.Data.Paragraphs));

            CreateMap<HowToAdoptDto, Configuration<HowToAdopt>>()
                .ForMember(x => x.Id, o => o.MapFrom(config => config.Id.AsObjectIdString()))
                .ForPath(x => x.Data.Paragraphs, o => o.MapFrom(config => config.Paragraphs));

            CreateMap<Configuration<LanguagesConfig>, LanguagesConfigDto>()
                .ForMember(x => x.Languages, o => o.MapFrom(config => config.Data.Languages));
            CreateMap<LanguagesConfigDto, Configuration<LanguagesConfig>>()
                .ForPath(x => x.Data.Languages, o => o.MapFrom(config => config.Languages));
        }
    }
}
