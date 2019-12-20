using AnimalRescue.Contracts.Query;
using AnimalRescue.DataAccess.Mongodb.Query;

namespace AnimalRescue.DataAccess.Contracts.Query
{
    internal static class QueryExtension
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
