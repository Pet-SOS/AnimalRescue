using System;
using System.Collections.Generic;
using System.Text;

namespace AnimalRescue.DataAccess.Mongodb.Configurations
{
    public interface IMongoDbSettings
    {
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }    
    }
}
