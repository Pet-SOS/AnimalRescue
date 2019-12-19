namespace AnimalRescue.DataAccess.Mongodb.Configurations
{
    internal class MongoDbSettings : IMongoDbSettings, IBucketSettings
    {
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
        public string BucketName { get; set; }
    }
}
