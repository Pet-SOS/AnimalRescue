using AnimalRescue.DataAccess.Mongodb.Configurations;
using AnimalRescue.DataAccess.Mongodb.Interfaces;
using AnimalRescue.DataAccess.Mongodb.Models;

using MongoDB.Driver;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace AnimalRescue.DataAccess.Mongodb
{
    public abstract class BaseCollection<T>: IBaseCollection<T>
        where T: BaseItem
    {
        protected IMongoClient client;
        protected IMongoDatabase database;
        protected IMongoCollection<T> collection;

        public BaseCollection(IMongoClient client, IMongoDbSettings settings)
        {
            this.client = client;
            database = client.GetDatabase(settings.DatabaseName);
        }

        public async Task<IAsyncCursor<T>> GetAsync() => await collection.FindAsync(t => true);
        public async Task<IAsyncCursor<T>> GetAsync(string id) => await collection.FindAsync(t => t.Id == id);
        public async Task UpdateAsync(string id, T instance) => await collection.ReplaceOneAsync(t => t.Id == id, instance);  
        public async Task RemoveAsync(T instance) => await collection.DeleteOneAsync(t => t.Id == instance.Id);  
        public async Task RemoveAsync(string id) => await collection.DeleteOneAsync(t => t.Id == id);
        public async Task<T> CreateAsync(T instance)
        {
            await collection.InsertOneAsync(instance);
            return instance;
        }   

        public List<T> Get() => collection.Find(t => true).ToList(); 
        public T Get(string id) => collection.Find(t => t.Id == id).FirstOrDefault();
        public void Update(string id, T instance) => collection.ReplaceOne(t => t.Id == id, instance);    
        public void Remove(T instance) => collection.DeleteOne(t => t.Id == instance.Id);
        public void Remove(string id) => collection.DeleteOne(t => t.Id == id);

        public T Create(T instance)
        {
            collection.InsertOne(instance);
            return instance;
        } 
    }
}
