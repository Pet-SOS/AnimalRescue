using AnimalRescue.API.Models;
using AnimalRescue.Contracts.Responses;

using Microsoft.ApplicationInsights.AspNetCore.Extensions;
using Microsoft.AspNetCore.Mvc;

using System.Collections.Generic;

namespace AnimalRescue.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ApiControllerBase : ControllerBase
    {
        private const string GetItemByIdMethodName = "Get";

        protected ActionResult<CollectionSegmentApiResponse<T>> Collection<T>(
            IReadOnlyCollection<T> source, int totalCount, int pageNumber, int pageSize) where T : class
        {
            if (!IsPagingValid(pageNumber, pageSize, totalCount))
            {
                return BadRequest("Page criteria oversizes the total quantity of items in the list.");
            }

            int pageCount = totalCount / pageSize + (totalCount % pageSize == 0 ? 0 : 1);

            return new CollectionSegmentApiResponse<T>
            {
                Data = source,
                TotalCount = totalCount,
                PageNumber = pageNumber,
                PageSize = pageSize,
                PageCount = pageCount,
                Self = BuildSelf()
            };
        }

        protected ActionResult<T> CreatedItem<T>(T item) where T : BaseModel
        {
            return CreatedAtAction(
                GetItemByIdMethodName,
                new { id = item.Id },
                BuildContentApiResponse(item));
        }

        protected ActionResult<T> Item<T>(T source)
        {
            if (source == null)
            {
                return NotFound();
            }

            return Ok(BuildContentApiResponse(source));
        }

        protected ApiResponse EmptyContent()
        {
            return new ApiResponse
            {
                Self = BuildSelf()
            };
        }

        private static bool IsPagingValid(int pageNumber, int pageSize, int totalCount)
        {
            if (pageNumber > 1)
            {
                int startItemNumber = ((pageNumber - 1) * pageSize) + 1;
                return startItemNumber <= totalCount;
            }

            return true;
        }

        private ContentApiResponse<T> BuildContentApiResponse<T>(T source)
        {
            return new ContentApiResponse<T>
            {
                Data = source,
                Self = BuildSelf()
            };
        }

        private string BuildSelf()
        {
            return Request.GetUri().ToString();
        }
    }
}
