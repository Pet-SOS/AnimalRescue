using AnimalRescue.DataAccess.Mongodb.Models;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace AnimalRescue.DataAccess.Mongodb.Interfaces.Collections
{
    public interface IBaseCollection<T>  
        where T : BaseItem 
    {
        List<T> Get();
        T Get(string id);
        T Create(T instance);
        void Update(string id, T TIn);
        void Remove(T TIn);
        void Remove(string id);

        Task<IAsyncCursor<T>> GetAsync();
        Task<IAsyncCursor<T>> GetAsync(string id);
        Task<IAsyncCursor<T>> GetAsync(int currentPage, int pageSize);
        Task<IAsyncCursor<T>> GetAsync(Expression<Func<T, bool>> func, int currentPage, int pageSize);
        Task<IAsyncCursor<T>> GetAsync(Expression<Func<T, bool>> func, Expression<Func<T, T>> projection, int currentPage, int pageSize);
        Task UpdateAsync(string id, T instance);
        Task RemoveAsync(T instance);
        Task RemoveAsync(string id);
        Task<T> CreateAsync(T instance);
    }
}
