namespace AnimalRescue.DataAccess.Mongodb.QueryBuilders
{
    public interface IQueryBuilder<T>
    {
        string SortAsString(string rowSortParams);
        string FilterAsString(string rowFilterParams);
    }
}
