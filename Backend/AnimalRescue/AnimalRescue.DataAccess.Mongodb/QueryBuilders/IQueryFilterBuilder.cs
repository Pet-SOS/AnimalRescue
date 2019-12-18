namespace AnimalRescue.DataAccess.Mongodb.QueryBuilders
{
    public interface IQueryFilterBuilder
    {
        string BuildStringFilterParams<T>(string rowFilterParams);
    }
}
