using AnimalRescue.Contracts.Query;
using AnimalRescue.Models.DTO.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AnimalRescue.Contracts
{
	public interface IBlogService
	{
		Task<IList<BlogDto>> GetAllBlogsAsync(ApiQueryRequest apiQueryRequest);
	}
}
