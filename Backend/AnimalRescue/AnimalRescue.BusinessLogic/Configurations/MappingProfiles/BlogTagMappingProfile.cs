using AnimalRescue.Contracts.BusinessLogic.Models.Blogs;
using AnimalRescue.DataAccess.Mongodb.Models;
using AutoMapper;

namespace AnimalRescue.BusinessLogic.Configurations.MappingProfiles
{
    internal class BlogTagMappingProfile : Profile
    {
        public BlogTagMappingProfile()
        {
            CreateMap<BlogTag, BlogTagDto>();
            CreateMap<BlogTagDto, BlogTag>();
        }
    }
}
