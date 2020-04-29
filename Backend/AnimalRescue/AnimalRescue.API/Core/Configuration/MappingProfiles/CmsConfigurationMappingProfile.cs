using AnimalRescue.API.Models.Configurations.Contacts;
using AnimalRescue.Contracts.BusinessLogic.Models.Configurations;
using AutoMapper;

namespace AnimalRescue.API.Core.Configuration.MappingProfiles
{
    public class CmsConfigurationMappingProfile : Profile
    {
        public CmsConfigurationMappingProfile()
        {
            CreateMap<CmsConfigurationModel, CmsConfigurationDto>();
            CreateMap<CmsConfigurationDto, CmsConfigurationModel>();
        }
    }
}
