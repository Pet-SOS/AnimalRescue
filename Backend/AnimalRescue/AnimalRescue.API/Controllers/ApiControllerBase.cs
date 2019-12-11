using AnimalRescue.Contracts.Responses;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AnimalRescue.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ApiControllerBase : ControllerBase
    {

        protected ActionResult<CollectionSegmentApiResponse<T>> Collection<T>(
            IReadOnlyCollection<T> source, int totalCount, int pageNumber, int pageSize, int pageCount = 0) where T : class
        {
            try
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
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


    }
}
