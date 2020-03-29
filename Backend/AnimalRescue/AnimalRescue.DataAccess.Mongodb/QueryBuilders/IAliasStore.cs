using System;

namespace AnimalRescue.DataAccess.Mongodb.QueryBuilders
{
    public interface IAliasStore
    {
        Alias GetAlias<T>(string aliasePropertyName);
        Alias GetAlias(Type type, string aliasePropertyName);
    }
}
