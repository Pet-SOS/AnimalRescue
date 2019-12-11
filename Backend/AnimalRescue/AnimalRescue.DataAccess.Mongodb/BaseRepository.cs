using AnimalRescue.DataAccess.Mongodb.Interfaces.Collections;
using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Models;

using MongoDB.Driver;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace AnimalRescue.DataAccess.Mongodb
{
    public class BaseRepository<T> : IBaseRepository<T>
        where T : BaseItem  
    {
        protected IBaseCollection<T> collection;
        public BaseRepository(IBaseCollection<T> collection)
        {
            this.collection = collection;
        }

        public async virtual Task<T> CreateAsync(T instance)
        {
            return await collection.CreateAsync(instance);
        }

        public async virtual Task<List<T>> GetAsync()
        {
            return (await collection.GetAsync()).ToList();
        }

        public async virtual Task<T> GetAsync(string id)
        {
            return (await collection.GetAsync(id)).FirstOrDefault();
        }

        public async virtual Task<List<T>> GetAsync(int pageNumber, int pageSize)
        {
            return (await collection.GetAsync(pageNumber, pageSize)).ToList();
        }

        public async virtual Task RemoveAsync(T instance)
        {
            await collection.RemoveAsync(instance);
        }

        public async virtual Task RemoveAsync(string id)
        {
            await collection.RemoveAsync(id);
        }

        public async virtual Task UpdateAsync(string id, T instance)
        {
            await collection.UpdateAsync(id, instance);
        }
    }
}
