using AnimalRescue.Contracts.BusinessLogic.Models.Configurations;
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
                .ForMember(x => x.SocialLinks, o => o.MapFrom(cms => cms.Data.SocialLinks));

            CreateMap<CmsConfigurationDto, Configuration<Contacts>>()
                .ForMember(x => x.Id, o => o.MapFrom(x => x.Id.AsObjectIdString()))
                .ForPath(x => x.Data.Addresses, o => o.MapFrom(cms => cms.Addresses))
                .ForPath(x => x.Data.Emails, o => o.MapFrom(cms => cms.Emails))
                .ForPath(x => x.Data.Phones, o => o.MapFrom(cms => cms.Phones))
                .ForPath(x => x.Data.SocialLinks, o => o.MapFrom(cms => cms.SocialLinks));


            CreateMap<Configuration<HelpAdopt>, HelpAdoptDto>().ForMember(x => x.Id, o => o.MapFrom(config => config.Id.AsGuid()))
                .ForPath(x => x.Title, o => o.MapFrom(config => config.Data.Title))
                .ForPath(x => x.Paragraphs, o => o.MapFrom(config => config.Data.Paragraphs));
            CreateMap<HelpAdoptDto, Configuration<HelpAdopt>>()
                .ForMember(x => x.Id, o => o.MapFrom(config => config.Id.AsObjectIdString()))
                .ForPath(x => x.Data.Title, o => o.MapFrom(config => config.Title))
                .ForPath(x => x.Data.Paragraphs, o => o.MapFrom(config => config.Paragraphs));

            CreateMap<Configuration<HelpPopup>, HelpPopupDto>()
                .ForMember(x => x.Id, o => o.MapFrom(config => config.Id.AsGuid()))
                .ForPath(x => x.Title, o => o.MapFrom(config => config.Data.Title))
                .ForPath(x => x.Paragraphs, o => o.MapFrom(config => config.Data.Paragraphs));
            CreateMap<HelpPopupDto, Configuration<HelpPopup>>()
                .ForMember(x => x.Id, o => o.MapFrom(config => config.Id.AsObjectIdString()))
                .ForPath(x => x.Data.Title, o => o.MapFrom(config => config.Title))
                .ForPath(x => x.Data.Paragraphs, o => o.MapFrom(config => config.Paragraphs));

            CreateMap<Configuration<HomePopup>, HomePopupDto>() //get
                .ForMember(x => x.Id, o => o.MapFrom(config => config.Id.AsGuid()))
                .ForPath(x => x.Title, o => o.MapFrom(config => config.Data.Title))
                .ForPath(x => x.Paragraphs, o => o.MapFrom(config => config.Data.Paragraphs))
                .ForPath(x => x.Email, o => o.MapFrom(config => config.Data.Email));
            CreateMap<HomePopupDto, Configuration<HomePopup>>() //post
                .ForMember(x => x.Id, o => o.MapFrom(config => config.Id.AsObjectIdString()))
                .ForPath(x => x.Data.Title, o => o.MapFrom(config => config.Title))
                .ForPath(x => x.Data.Paragraphs, o => o.MapFrom(config => config.Paragraphs))
                .ForPath(x => x.Data.Email, o => o.MapFrom(config => config.Email));


            CreateMap<Configuration<LanguagesConfig>, LanguagesConfigDto>()
                .ForMember(x => x.Languages, o => o.MapFrom(config => config.Data.Languages));
            CreateMap<LanguagesConfigDto, Configuration<LanguagesConfig>>()
                .ForPath(x => x.Data.Languages, o => o.MapFrom(config => config.Languages));
        }
    }
}
