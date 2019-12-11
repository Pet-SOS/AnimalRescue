using AnimalRescue.Models.DTO;
using AutoMapper;

namespace AnimalRescue.API.Core
{
    public class ApiMappingProfile : Profile
    {
        public ApiMappingProfile()
        {
            CreateMap<Models.CmsConfigurationModel, CmsConfigurationModel>();
            CreateMap<CmsConfigurationModel, Models.CmsConfigurationModel>();
        }
    }
}
