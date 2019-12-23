using AnimalRescue.Contracts.Common.Query;
using AnimalRescue.DataAccess.Mongodb.Query;

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
