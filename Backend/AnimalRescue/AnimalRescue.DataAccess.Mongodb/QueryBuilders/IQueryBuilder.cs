using MongoDB.Driver;

namespace AnimalRescue.DataAccess.Mongodb.QueryBuilders
{
    internal interface IQueryBuilder<T>
    {
        string SortAsString(string rowSortParams);
        string FilterAsString(string rowFilterParams);
        FilterDefinition<T> FilterAsFilterDefinition(string rowFilterParams);
    }
}
