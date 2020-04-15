using AnimalRescue.Contracts.BusinessLogic.Interfaces.CRUD;
using AnimalRescue.Contracts.BusinessLogic.Models.Blogs;

namespace AnimalRescue.Contracts.BusinessLogic.Interfaces
{
    public interface IStoryService :
        IBlCollectinQueryAsync<StoryDto>,
        IBlOneItemQueryAsync<StoryDto>,
        IBlCreateAsync<StoryDto, StoryDto>,
        IBlUpdateAsync<StoryDto>,
        IBlDeleteAsync
    {
    }
}
