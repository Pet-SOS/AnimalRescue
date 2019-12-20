using AnimalRescue.BusinessLogic.Models;
using AnimalRescue.Contracts.Query;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace AnimalRescue.Contracts
{
    public interface IBlogService
	{
		Task<(IList<BlogDto> blogDtos, int totalCount)> GetAllBlogsAsync(ApiQueryRequest apiQueryRequest);
	}
}
