using AnimalRescue.Contracts.BusinessLogic.Models.Blogs;
using AnimalRescue.DataAccess.Mongodb.Models;

using AutoMapper;
using static AnimalRescue.Contracts.Common.Constants.PropertyConstants;

namespace AnimalRescue.BusinessLogic.Configurations.MappingProfiles
{
	internal class BlogMappingProfile : Profile
	{
		public BlogMappingProfile()
		{
			CreateMap<Article, BlogDto>();
			CreateMap<BlogDto, Article>()
				.ForMember(x => x.Type, o => o.MapFrom(b => EntityType.Blog));

			CreateMap<BlogCreateDto, Article>()
				.ForMember(x => x.CreatedAt, p => p.Ignore())
				.ForMember(x => x.CreatedBy, p => p.Ignore())
				.ForMember(x => x.Type, o => o.MapFrom(b => EntityType.Blog));
		}
	}
}
