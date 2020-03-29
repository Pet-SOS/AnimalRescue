using MongoDB.Driver;

using System.Linq;

namespace AnimalRescue.DataAccess.Mongodb.QueryBuilders
{
    internal class QueryFilterBuilder : IQueryFilterBuilder
    {
        private readonly IAliasStore aliasStore;
        private string defaultFilter = "{}";

        public QueryFilterBuilder(IAliasStore aliasStore)
        {
            this.aliasStore = aliasStore;
        }
        public string BuildStringFilterParams<T>(string rowFilterParams)
        {
            var filterArrey = rowFilterParams?
                .GetRawTerms()
                .Select(data => new Term(aliasStore, data))
                .Select(term => term.GetDbTerm<T>());
            var result = filterArrey != null
                ? "{" + string.Join(",", filterArrey) + "}"
                : defaultFilter;

            return result;
        }
        public FilterDefinition<T> BuildFilterParams<T>(string rowFilterParams)
        {
            var result = QueryAnalyzer.BuildFilterParams<T>(rowFilterParams, aliasStore);

            return result;
        }
    }
}
