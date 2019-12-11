using AnimalRescue.DataAccess.Mongodb.Configurations;
using AnimalRescue.DataAccess.Mongodb.Models;
using AnimalRescue.Infrastructure;
using MongoDB.Driver;

namespace AnimalRescue.DataAccess.Mongodb
{
    public class Repository<T> where T : BaseItem
    {
        protected IMongoClient client;
        protected IMongoDatabase database;
        protected IMongoCollection<T> collection;

        public Repository(IMongoClient client, IMongoDbSettings settings)
        {
            this.client = client;

            database = client.GetDatabase(settings.DatabaseName);

            collection = database.GetCollection<T>(typeof(T).GetNameWithoutGenericArity());
        }
    }
}
