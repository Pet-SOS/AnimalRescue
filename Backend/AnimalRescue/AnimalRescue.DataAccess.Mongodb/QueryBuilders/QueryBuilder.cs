using MongoDB.Driver;

namespace AnimalRescue.DataAccess.Mongodb.QueryBuilders
{
    internal class QueryBuilder<T> : IQueryBuilder<T>
    {
        private readonly IQuerySortBuilder querySortBuilder;
        private readonly IQueryFilterBuilder queryFilterBuilder;

        public QueryBuilder(
            IQuerySortBuilder querySortBuilder,
            IQueryFilterBuilder queryFilterBuilder)
        {
            this.querySortBuilder = querySortBuilder;
            this.queryFilterBuilder = queryFilterBuilder;
        }

        public string SortAsString(string rowSortParams) => querySortBuilder.BuildStringSortParams<T>(rowSortParams);

        public string FilterAsString(string rowFilterParams) => queryFilterBuilder.BuildStringFilterParams<T>(rowFilterParams);
        public FilterDefinition<T> FilterAsFilterDefinition(string rowFilterParams) => queryFilterBuilder.BuildFilterParams<T>(rowFilterParams);
    }
}
