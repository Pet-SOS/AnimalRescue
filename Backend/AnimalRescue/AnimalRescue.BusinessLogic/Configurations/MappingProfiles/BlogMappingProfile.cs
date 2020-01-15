using AnimalRescue.Contracts.BusinessLogic.Models.Blogs;
using AnimalRescue.DataAccess.Mongodb.Models;

using AutoMapper;

namespace AnimalRescue.BusinessLogic.Configurations.MappingProfiles
{
	internal class BlogMappingProfile : Profile
	{
		public BlogMappingProfile()
		{
			CreateMap<Blog, BlogDto>();
			CreateMap<BlogDto, Blog>();

			CreateMap<BlogCreateDto, Blog>()
				.ForMember(x => x.CreatedAt, p => p.Ignore())
				.ForMember(x => x.CreatedBy, p => p.Ignore());
		}
	}
}
