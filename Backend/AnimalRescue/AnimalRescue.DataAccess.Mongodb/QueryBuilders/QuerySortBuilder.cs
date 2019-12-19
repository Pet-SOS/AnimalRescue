using System.Linq;

namespace AnimalRescue.DataAccess.Mongodb.QueryBuilders
{
    internal class QuerySortBuilder : IQuerySortBuilder
    {
        public const string Descending = "decs";
        public const string Ascending = "acs";
        private const string DefaultSort = "{}";

        public string BuildStringSortParams<T>(string rowSortParams)
        {
            var sortArrey = rowSortParams?.Split(";").Select(x => x.Replace(Descending, "-1").Replace(Ascending, "1"));

            var result = sortArrey != null
                ? "{" + string.Join(",", sortArrey) + "}"
                : DefaultSort;

            return result;
        }
    }
}
