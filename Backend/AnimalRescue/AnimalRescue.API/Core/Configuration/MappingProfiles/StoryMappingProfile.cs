using AnimalRescue.API.Models.Blogs.Stories;
using AnimalRescue.Contracts.BusinessLogic.Models.Blogs;

namespace AnimalRescue.API.Core.Configuration.MappingProfiles
{
    public class StoryMappingProfile : ProfileMapper
    {
        public StoryMappingProfile()
        {
            CreateMapFor<StoryCreateModel, StoryUpdateModel, StoryInfoModel, StoryDto>();
        }
    }
}
