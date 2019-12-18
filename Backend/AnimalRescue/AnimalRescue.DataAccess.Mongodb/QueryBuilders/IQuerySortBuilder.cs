namespace AnimalRescue.DataAccess.Mongodb.QueryBuilders
{
    public interface IQuerySortBuilder
    {
        string BuildStringSortParams<T>(string rowSortParams);
    }
}
