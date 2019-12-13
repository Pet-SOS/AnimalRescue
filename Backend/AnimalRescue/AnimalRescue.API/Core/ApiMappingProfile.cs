using AnimalRescue.API.Models;
using AnimalRescue.Models.DTO;
using AnimalRescue.Models.DTO.Models;

using AutoMapper;

namespace AnimalRescue.API.Core
{
    public class ApiMappingProfile : Profile
    {
        public ApiMappingProfile()
        {
            CreateMap<CmsConfigurationModel, CmsConfigurationDto>();
            CreateMap<CmsConfigurationDto, CmsConfigurationModel>();

            CreateMap<AnimalModel, AnimalDto>();
            CreateMap<AnimalDto, AnimalModel>();

			CreateMap<BlogModel, BlogDto>();
			CreateMap<BlogDto, BlogModel>();
		}
    }
}
