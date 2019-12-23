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
                .Split(";")
                .Select(data => new Term(aliasStore, data))
                .Select(term => term.GetDbTerm<T>());
            var result = filterArrey != null  
                ? "{" + string.Join(",", filterArrey) + "}"  
                : defaultFilter;

            return result;
        }
    }
}
