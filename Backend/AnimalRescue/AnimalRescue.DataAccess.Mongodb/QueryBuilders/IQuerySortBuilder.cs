namespace AnimalRescue.DataAccess.Mongodb.QueryBuilders
{
    internal interface IQuerySortBuilder
    {
        string BuildStringSortParams<T>(string rowSortParams);
    }
}
