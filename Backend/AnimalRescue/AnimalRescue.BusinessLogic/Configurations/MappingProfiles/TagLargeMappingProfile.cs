using AnimalRescue.Contracts.BusinessLogic.Models.Tag;
using AnimalRescue.DataAccess.Mongodb.Extensions;
using AnimalRescue.DataAccess.Mongodb.Models.Tag;
using AutoMapper;
using System;

namespace AnimalRescue.BusinessLogic.Configurations.MappingProfiles
{
    internal class TagLargeMappingProfile : Profile
    {
        public TagLargeMappingProfile()
        {
            CreateMap<LanguageValue, LanguageValueDto>();
            CreateMap<LanguageValueDto, LanguageValue>();
            CreateMap<TagLarge, TagLargeDto>()
                .ForMember(x => x.Id, o => o.MapFrom(x => x.Id.AsGuid()));
            CreateMap<TagLargeDto, TagLarge>()
                .ForMember(x => x.Id, o => o.MapFrom(x => new Guid(x.Id).AsObjectIdString()));
        }
    }
}
