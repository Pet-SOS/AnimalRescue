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
            CreateMap<Configuration<Donation>, DonationConfigurationDto>()
                .ForMember(x => x.Id, o => o.MapFrom(x => x.Id.AsGuid()))
                .ForMember(x => x.Body, o => o.MapFrom(cms => cms.Data.Body));

            CreateMap<DonationConfigurationDto, Configuration<Donation>>()
                .ForMember(x => x.Id, o => o.MapFrom(x => x.Id.AsObjectIdString()))
                .ForPath(x => x.Data.Body, o => o.MapFrom(cms => cms.Body));
        }
    }
}
