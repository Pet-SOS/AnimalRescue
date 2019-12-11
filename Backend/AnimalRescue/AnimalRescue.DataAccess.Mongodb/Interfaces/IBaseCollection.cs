using MongoDB.Driver;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AnimalRescue.DataAccess.Mongodb.Interfaces
{
    public interface IBaseCollection<T>
    {
        List<T> Get(); 
        T Get(string id);  
        T Create(T instance); 
        void Update(string id, T TIn);   
        void Remove(T TIn); 
        void Remove(string id);  

        Task<IAsyncCursor<T>> GetAsync();
        Task<IAsyncCursor<T>> GetAsync(string id);
        Task UpdateAsync(string id, T instance);
        Task RemoveAsync(T instance);
        Task RemoveAsync(string id);
        Task<T> CreateAsync(T instance);
    }
}
