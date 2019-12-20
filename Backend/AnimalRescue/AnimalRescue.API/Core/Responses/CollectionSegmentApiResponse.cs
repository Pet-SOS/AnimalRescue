using System.Collections.Generic;

namespace AnimalRescue.API.Core.Responses
{
    public class CollectionSegmentApiResponse<T> : ContentApiResponse<IEnumerable<T>>
    {
        public int TotalCount { get; set; }

        public int PageNumber { get; set; }

        public int PageSize { get; set; }

        public int PageCount { get; set; }
    }
}