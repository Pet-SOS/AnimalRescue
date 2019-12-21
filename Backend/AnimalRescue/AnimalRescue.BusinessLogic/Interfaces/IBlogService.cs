using AnimalRescue.BusinessLogic.Interfaces.CRUD;
using AnimalRescue.BusinessLogic.Models;

namespace AnimalRescue.Contracts
{
    public interface IBlogService : 
        IBlCollectinQueryAsyncy<BlogDto>
    {
	}
}
