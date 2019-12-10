using System;

namespace AnimalRescue.DataAccess.Mongodb.Configurations
{
    public class MongoDatabaseSettings : IMongoDatabaseSettings
    {
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
    }
}
