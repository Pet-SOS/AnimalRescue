using AnimalRescue.Contracts.BusinessLogic.Models.Configurations;
using AnimalRescue.Contracts.BusinessLogic.Models.Configurations.Info;
using AnimalRescue.DataAccess.Mongodb.Extensions;
using AnimalRescue.DataAccess.Mongodb.Models.Configurations;
using AnimalRescue.DataAccess.Mongodb.Models.Configurations.Nested;
using AnimalRescue.DataAccess.Mongodb.Models.Configurations.Nested.Info;
using AutoMapper;
using System;

namespace AnimalRescue.BusinessLogic.Configurations.MappingProfiles
{
    internal class CmsConfigurationMappingProfile : Profile
    {
        public CmsConfigurationMappingProfile()
        {
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

            CreateMap<HelpAdopt, HelpAdoptDto>();
            CreateMap<HelpAdoptDto, HelpAdopt>();

            CreateMap<HelpPopup, HelpPopupDto>();
            CreateMap<HelpPopupDto, HelpPopup>();

            //get
            CreateMap<Configuration<GetHomePopup>, GetHomePopupDto>()
                .ForMember(x => x.Id, o => o.MapFrom(x => x.Id.AsGuid()))
                .ForPath(x => x.Title.Id, o => o.MapFrom(cms => cms.Data.TitleId.AsGuid()))
                .ForPath(x => x.Text.Id, o => o.MapFrom(cms => cms.Data.TextId.AsGuid()))
                .ForPath(x => x.Email, o => o.MapFrom(cms => cms.Data.Email));

            //post
            CreateMap<GetHomePopupDto, Configuration<GetHomePopup>>()
                .ForMember(x => x.Id, o => o.MapFrom(x => x.Id.AsObjectIdString()))
                .ForPath(x => x.Data.TitleId, o => o.MapFrom(cms => new Guid(cms.Title.Id).AsObjectIdString()))
                .ForPath(x => x.Data.TextId, o => o.MapFrom(cms => new Guid(cms.Text.Id).AsObjectIdString()))
                .ForPath(x => x.Data.Email, o => o.MapFrom(cms => cms.Email));


            CreateMap<Configuration<LanguagesConfig>, LanguagesConfigDto>();
            CreateMap<LanguagesConfigDto, Configuration<LanguagesConfig>>();
        }
    }
}
