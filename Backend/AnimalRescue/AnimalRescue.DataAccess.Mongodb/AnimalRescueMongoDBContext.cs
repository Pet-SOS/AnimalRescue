using AnimalRescue.DataAccess.Mongodb.Configurations;
using AnimalRescue.DataAccess.Mongodb.Interfaces;
using AnimalRescue.DataAccess.Mongodb.Models;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Text;

namespace AnimalRescue.DataAccess.Mongodb
{
    public abstract class AnimalRescueMongoDBContext<T>: IBaseCollection<T>
        where T: BaseItem
    {
        protected IMongoClient client;
        protected IMongoDatabase database;
        protected IMongoCollection<T> collection;

        public AnimalRescueMongoDBContext(IMongoClient client, IMongoDatabaseSettings settings)
        {
            this.client = client;
            database = client.GetDatabase(settings.DatabaseName);
        }

        public List<T> Get() =>
                collection.Find(t => true).ToList();

        public T Get(string id)  =>
            collection.Find<T>(t => t.Id == id).FirstOrDefault();

        public T Create(T instance)
        {
            collection.InsertOne(instance);
            return instance;
        }

        public void Update(string id, T TIn) =>
            collection.ReplaceOne(t => t.Id == id, TIn);

        public void Remove(T TIn) =>
            collection.DeleteOne(t => t.Id == TIn.Id);

        public void Remove(string id) =>
            collection.DeleteOne(t => t.Id == id);

    }
}
