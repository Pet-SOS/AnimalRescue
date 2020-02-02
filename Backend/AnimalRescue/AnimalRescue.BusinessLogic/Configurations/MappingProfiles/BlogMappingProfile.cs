using AnimalRescue.Contracts.BusinessLogic.Models.Blogs;
using AnimalRescue.DataAccess.Mongodb.Exceptions;
using AnimalRescue.DataAccess.Mongodb.Models;

using AutoMapper;
using System.Linq;
using static AnimalRescue.Contracts.Common.Constants.PropertyConstants;

namespace AnimalRescue.BusinessLogic.Configurations.MappingProfiles
{
	internal class BlogMappingProfile : Profile
	{
		public BlogMappingProfile()
		{
			CreateMap<Article, BlogDto>()
				.ForMember(x => x.Id, o => o.MapFrom(x => x.Id.AsGuid()))
				.ForMember(x => x.ImageIds, o => o.MapFrom(x => x.ImageIds.Select(ObjectIdExtentions.AsGuid)));
			CreateMap<BlogDto, Article>()
				.ForMember(x => x.ImageIds, o => o.MapFrom(x => x.ImageIds.Select(ObjectIdExtentions.AsObjectIdString)))
				.ForMember(x => x.Id, o => o.MapFrom(x => x.Id.AsObjectIdString()))
				.ForMember(x => x.Type, o => o.MapFrom(b => EntityType.Blog));

			CreateMap<BlogCreateDto, Article>()
				.ForMember(x => x.ImageIds, o => o.MapFrom(x => x.ImageIds.Select(m => m.AsObjectIdString())))
				.ForMember(x => x.Id, p => p.Ignore())
				.ForMember(x => x.CreatedAt, p => p.Ignore())
				.ForMember(x => x.CreatedBy, p => p.Ignore())
				.ForMember(x => x.Type, o => o.MapFrom(b => EntityType.Blog));
		}
	}
}
