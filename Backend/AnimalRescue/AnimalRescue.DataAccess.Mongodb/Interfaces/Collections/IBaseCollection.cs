using AnimalRescue.DataAccess.Contracts.Query;
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
        Task<List<T>> GetAsync(DbQuery query);
        Task<IAsyncCursor<T>> GetAsync();
        Task<IAsyncCursor<T>> GetAsync(string id);
        Task<IAsyncCursor<T>> GetAsync(int currentPage, int pageSize);
        Task UpdateAsync(string id, T instance);
        Task RemoveAsync(T instance);
        Task RemoveAsync(string id);
        Task<T> CreateAsync(T instance);
    }
}
