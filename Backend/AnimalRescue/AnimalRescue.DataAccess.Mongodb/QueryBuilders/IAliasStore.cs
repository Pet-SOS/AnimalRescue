using System;

namespace AnimalRescue.DataAccess.Mongodb.QueryBuilders
{
    internal interface IAliasStore
    {
        Alias GetAlias<T>(string aliasePropertyName);
        Alias GetAlias(Type type, string aliasePropertyName);
    }
}
