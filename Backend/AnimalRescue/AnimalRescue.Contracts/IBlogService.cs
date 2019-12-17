using AnimalRescue.Contracts.Query;
using AnimalRescue.Models.DTO.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AnimalRescue.Contracts
{
	public interface IBlogService
	{
		Task<(IList<BlogDto> blogDtos, int totalCount)> GetAllBlogsAsync(ApiQueryRequest apiQueryRequest);
	}
}
