using AnimalRescue.API.Models;
using AnimalRescue.API.Models.Blogs;
using AnimalRescue.Contracts.BusinessLogic.Models;
using AnimalRescue.Contracts.BusinessLogic.Models.Blogs;
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

			CreateMap<AnimalCreateModel, AnimalModel>();

			CreateMap<BlogInfoModel, BlogDto>();
			CreateMap<BlogDto, BlogInfoModel>();

			CreateMap<BlogCreateModel, BlogCreateDto>();
			CreateMap<BlogDto, BlogInfoModel>();

			CreateMap<BlogUpdateModel, BlogDto>();
		}
	}
}
