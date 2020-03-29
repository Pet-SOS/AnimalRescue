using System;

namespace AnimalRescue.DataAccess.Mongodb.QueryBuilders
{
    public interface IAliasStore
    {
        Alias GetAlias<T>(string aliasPropertyName);
        Alias GetAlias(Type type, string aliasPropertyName);
    }
}
