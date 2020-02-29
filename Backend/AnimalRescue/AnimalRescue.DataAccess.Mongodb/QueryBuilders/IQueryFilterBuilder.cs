using MongoDB.Driver;

namespace AnimalRescue.DataAccess.Mongodb.QueryBuilders
{
    internal interface IQueryFilterBuilder
    {
        string BuildStringFilterParams<T>(string rowFilterParams);
        FilterDefinition<T> BuildFilterParams<T>(string rowFilterParams);
    }
}
