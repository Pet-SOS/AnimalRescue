using AnimalRescue.Contracts.BusinessLogic.Interfaces.CRUD;
using AnimalRescue.Contracts.BusinessLogic.Models.Blogs;

namespace AnimalRescue.Contracts.BusinessLogic.Interfaces
{
    public interface IBlogTagService :
        IBlCollectinQueryAsyncy<BlogTagDto>,
        IBlOneItemQueryAsyncy<BlogTagDto>,
        IBlCreateAsync<BlogTagDto, BlogTagDto>,
        IBlUpdateAsync<BlogTagDto>,
        IBlDeleteAsync
    {
    }
}
