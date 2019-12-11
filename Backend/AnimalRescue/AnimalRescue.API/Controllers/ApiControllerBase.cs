using AnimalRescue.Contracts.Responses;

using Microsoft.AspNetCore.Mvc;

using System.Collections.Generic;

namespace AnimalRescue.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ApiControllerBase : ControllerBase
    {  
        protected ActionResult<CollectionSegmentApiResponse<T>> Collection<T>(
            IReadOnlyCollection<T> source, int totalCount, int pageNumber, int pageSize, int pageCount = 0) where T : class
        {
                return new CollectionSegmentApiResponse<T>
                {
                    Data = source,
                    TotalCount = totalCount,
                    PageNumber = pageNumber,
                    PageSize = pageSize,
                    PageCount = pageCount,
                    // Self = BuildSelf()
                };
        } 
    }
}
