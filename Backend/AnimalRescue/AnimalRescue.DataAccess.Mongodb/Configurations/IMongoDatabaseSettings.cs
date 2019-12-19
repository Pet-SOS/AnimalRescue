namespace AnimalRescue.DataAccess.Mongodb.Configurations
{
    internal interface IMongoDbSettings
    {
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
    }
}
