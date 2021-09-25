using AnimalRescue.API.Models.Blogs.Blogs;
using AnimalRescue.Contracts.BusinessLogic.Models.Blogs;

namespace AnimalRescue.API.Core.Configuration.MappingProfiles
{
    public class BlogMappingProfile : ProfileMapper
    {
        public BlogMappingProfile()
        {
            CreateMapFor<BlogCreateModel, BlogUpdateModel, BlogInfoModel, BlogDto>();
        }
    }
}
