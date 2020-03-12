using MongoDB.Driver;
using System;
using System.Linq.Expressions;

namespace AnimalRescue.DataAccess.Mongodb.QueryBuilders
{
    internal class QueryBuilder<T> : IQueryBuilder<T>
    {
        private readonly IQuerySortBuilder querySortBuilder;
        private readonly IQueryFilterBuilder queryFilterBuilder;
        private readonly FilterDefinitionBuilder<T> _filterBuilder;

        public QueryBuilder(
            IQuerySortBuilder querySortBuilder,
            IQueryFilterBuilder queryFilterBuilder)
        {
            this.querySortBuilder = querySortBuilder;
            this.queryFilterBuilder = queryFilterBuilder;
            _filterBuilder = Builders<T>.Filter;
        }

        public string SortAsString(string rowSortParams) => querySortBuilder.BuildStringSortParams<T>(rowSortParams);

        public string FilterAsString(string rowFilterParams) => queryFilterBuilder.BuildStringFilterParams<T>(rowFilterParams);
        public FilterDefinition<T> FilterAsFilterDefinition(string rowFilterParams) => queryFilterBuilder.BuildFilterParams<T>(rowFilterParams);


        public FilterDefinition<T> Where(Expression<Func<T, bool>> expression)
        {
            FilterDefinition<T> definition = _filterBuilder.Where(expression);
            return definition;
        }
    }
}
