using MongoDB.Driver;

using System.Linq;

namespace AnimalRescue.DataAccess.Mongodb.QueryBuilders
{
    internal class QueryFilterBuilder : IQueryFilterBuilder
    {
        private readonly IAliasStore aliasStore;

        public QueryFilterBuilder(IAliasStore aliasStore)
        {
            this.aliasStore = aliasStore;
        }

        public FilterDefinition<T> BuildFilterParams<T>(string rowFilterParams)
        {
            var result = QueryAnalyzer.BuildFilterParams<T>(rowFilterParams, aliasStore);

            return result;
        }
    }
}
