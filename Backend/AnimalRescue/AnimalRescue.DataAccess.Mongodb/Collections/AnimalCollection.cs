using AnimalRescue.DataAccess.Mongodb.Configurations;
using AnimalRescue.DataAccess.Mongodb.Interfaces;
using AnimalRescue.DataAccess.Mongodb.Models;
using MongoDB.Driver;

namespace AnimalRescue.DataAccess.Mongodb.Collections
{
    public class AnimalCollection : BaseCollection<Animal>, IAnimalCollection
    {
        public AnimalCollection(IMongoClient client, IMongoDbSettings settings) : base(client, settings)
        {
            base.collection = database.GetCollection<Animal>(nameof(Animal));
        }
    }
}
