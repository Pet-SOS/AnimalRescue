using AnimalRescue.API.Models.Configurations.Donations;
using AnimalRescue.Contracts.BusinessLogic.Models.Configurations.Donations;
using AutoMapper;

namespace AnimalRescue.API.Core.Configuration.MappingProfiles
{
    public class DonationConfigurationMappingProfile : Profile
    {
        public DonationConfigurationMappingProfile()
        {
            CreateMap<DonationConfigurationModel, DonationConfigurationDto>();
            CreateMap<DonationConfigurationDto, DonationConfigurationModel>();
        }
    }
}
