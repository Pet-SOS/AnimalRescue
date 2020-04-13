using MongoDB.Driver;

namespace AnimalRescue.DataAccess.Mongodb.QueryBuilders
{
    internal interface IQueryFilterBuilder
    {
        FilterDefinition<T> BuildFilterParams<T>(string rowFilterParams);
    }
}
