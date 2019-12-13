using AnimalRescue.Models.DTO.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AnimalRescue.Contracts
{
	public interface IBlogService
	{
		Task<IList<BlogModel>> GetAllBlogsAsync(int pageNumber, int pageSize);
	}
}
