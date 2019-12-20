using AnimalRescue.BusinessLogic.Models;
using AnimalRescue.Infrastructure.Interfaces.CRUD;
using AnimalRescue.Infrastructure.Query;

using System.Collections.Generic;

namespace AnimalRescue.Contracts
{
    public interface IBlogService :
        IBaseQuery<(List<BlogDto> collection, int totalCount), ApiQueryRequest>
    {
	}
}
