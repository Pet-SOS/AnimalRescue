using AnimalRescue.DataAccess.Mongodb.Configurations;
using AnimalRescue.DataAccess.Mongodb.Interfaces;
using AnimalRescue.DataAccess.Mongodb.Models;
using MongoDB.Driver;

namespace AnimalRescue.DataAccess.Mongodb.Collections
{
    public class AnimalCollection : AnimalRescueMongoDBContext<Animal>, IAnimalCollection
    {
        public AnimalCollection(IMongoClient client, IMongoDatabaseSettings settings) : base(client, settings)
        {
            base.collection = database.GetCollection<Animal>(nameof(Animal));
        }
    }
}
