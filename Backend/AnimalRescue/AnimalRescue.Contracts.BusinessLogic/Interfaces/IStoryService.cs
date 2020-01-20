using AnimalRescue.Contracts.BusinessLogic.Interfaces.CRUD;
using AnimalRescue.Contracts.BusinessLogic.Models.Blogs;

namespace AnimalRescue.Contracts.BusinessLogic.Interfaces
{
    public interface IStoryService :
        IBlCollectinQueryAsyncy<StoryDto>,
        IBlOneItemQueryAsyncy<StoryDto>,
        IBlCreateAsync<StoryDto, StoryDto>,
        IBlUpdateAsync<StoryDto>,
        IBlDeleteAsync
    {
    }
}
