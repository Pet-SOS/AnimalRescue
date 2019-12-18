namespace AnimalRescue.DataAccess.Mongodb.QueryBuilders
{
    public class QueryFilterBuilder : IQueryFilterBuilder
    {
        private string defaultFilter = "{}";

        public string BuildStringFilterParams<T>(string rowFilterParams)
        {
            return defaultFilter;
        }
    }
}
