using AnimalRescue.Contracts.BusinessLogic.Models.Configurations.Donations;
using AnimalRescue.DataAccess.Mongodb.Extensions;
using AnimalRescue.DataAccess.Mongodb.Models.Configurations;
using AnimalRescue.DataAccess.Mongodb.Models.Configurations.Nested;

using AutoMapper;

namespace AnimalRescue.BusinessLogic.Configurations.MappingProfiles
{
    internal class DonationConfigurationMappingProfile : Profile
    {
        public DonationConfigurationMappingProfile()
        {
            CreateMap<BankCard, BankCardDto>();
            CreateMap<BankCardDto, BankCard>();

            CreateMap<Configuration<Donation>, DonationConfigurationDto>()
                .ForMember(x => x.Id, o => o.MapFrom(x => x.Id.AsGuid()))
                .ForMember(x => x.BankCard, o => o.MapFrom(cms => cms.Data.BankCard))
                .ForMember(x => x.Body, o => o.MapFrom(cms => cms.Data.Body))
                .ForMember(x => x.Title, o => o.MapFrom(cms => cms.Data.Title));

            CreateMap<DonationConfigurationDto, Configuration<Donation>>()
                .ForMember(x => x.Id, o => o.MapFrom(x => x.Id.AsObjectIdString()))
                .ForPath(x => x.Data.BankCard, o => o.MapFrom(cms => cms.BankCard))
                .ForPath(x => x.Data.Title, o => o.MapFrom(cms => cms.Title))
                .ForPath(x => x.Data.Body, o => o.MapFrom(cms => cms.Body));
        }
    }
}
