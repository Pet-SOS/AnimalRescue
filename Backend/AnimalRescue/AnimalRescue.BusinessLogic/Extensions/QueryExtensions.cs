using AnimalRescue.DataAccess.Mongodb.Query;
using AnimalRescue.Infrastructure.Query;

namespace AnimalRescue.BusinessLogic.Extensions
{
    internal static class QueryExtensions
    {
        public static DbQuery ToDbQuery(this ApiQueryRequest apiQueryRequest)
        {
            return new DbQuery
            {
                Filter = apiQueryRequest.Filter,
                Page = apiQueryRequest.Page,
                Size = apiQueryRequest.Size,
                Sort = apiQueryRequest.Sort
            };
        }
    }
}
