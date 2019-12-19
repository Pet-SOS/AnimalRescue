namespace AnimalRescue.DataAccess.Mongodb.QueryBuilders
{
    internal interface IQueryFilterBuilder
    {
        string BuildStringFilterParams<T>(string rowFilterParams);
    }
}
