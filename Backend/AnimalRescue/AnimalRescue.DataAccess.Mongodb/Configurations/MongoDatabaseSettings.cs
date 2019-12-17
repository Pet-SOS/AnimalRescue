namespace AnimalRescue.DataAccess.Mongodb.Configurations
{
    public class MongoDbSettings : IMongoDbSettings, IBucketSettings
    {
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
        public string BucketName { get; set; }
    }
}
