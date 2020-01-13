using AnimalRescue.Contracts.BusinessLogic.Interfaces.CRUD;
using AnimalRescue.Contracts.BusinessLogic.Models;

namespace AnimalRescue.Contracts.BusinessLogic.Interfaces
{
    public interface IStoryService :
        IBlCollectinQueryAsyncy<StoryDto>,
        IBlOneItemQueryAsyncy<StoryDto>,
        IBlCreateAsync<StoryDto>,
        IBlUpdateAsync<StoryDto>,
        IBlDeleteAsync
    {
    }
}
