namespace AnimalRescue.DataAccess.Mongodb.QueryBuilders
{
    internal interface IAliasStore
    {
        Alias GetAlias<T>(string aliasePropertyName);
    }
}
