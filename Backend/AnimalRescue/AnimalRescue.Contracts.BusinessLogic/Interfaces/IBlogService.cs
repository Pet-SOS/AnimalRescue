using AnimalRescue.Contracts.BusinessLogic.Interfaces.CRUD;
using AnimalRescue.Contracts.BusinessLogic.Models.Blogs;

namespace AnimalRescue.Contracts.BusinessLogic.Interfaces
{
	public interface IBlogService :
		IBlCollectinQueryAsyncy<BlogDto>,
		IBlOneItemQueryAsyncy<BlogDto>,
		IBlCreateAsync<BlogDto, BlogCreateDto>,
		IBlUpdateAsync<BlogDto>,
		IBlDeleteAsync
	{
	}
}
