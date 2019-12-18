using AnimalRescue.Contracts.Query;

namespace AnimalRescue.DataAccess.Contracts.Query
{
    public static class QueryExtension
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
