using System.Linq;

namespace AnimalRescue.DataAccess.Mongodb.QueryBuilders
{
    internal class QueryFilterBuilder : IQueryFilterBuilder
    {
        private string defaultFilter = "{}";

        public string BuildStringFilterParams<T>(string rowFilterParams)
        {
            var filterArrey = rowFilterParams?
                .Split(";")
                .Select(data => new Term(data))
                .Select(term => term.GetDbTerm());
            var result = filterArrey != null  
                ? "{" + string.Join(",", filterArrey) + "}"  
                : defaultFilter;

            return result;
        }
    }
}
