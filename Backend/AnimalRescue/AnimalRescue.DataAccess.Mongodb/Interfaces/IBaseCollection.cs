using AnimalRescue.DataAccess.Mongodb.Models;
using AnimalRescue.DataAccess.Mongodb.Query;

using MongoDB.Driver;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace AnimalRescue.DataAccess.Mongodb.Interfaces
{
    internal interface IBaseCollection<T>
        where T : BaseItem
    {
        IMongoCollection<T> Collection { get; }
        Task<List<T>> GetAsync(DbQuery query);
        Task<int> GetCountAsync(DbQuery query);
        Task<T> GetAsync(string id);
        Task<T> CreateAsync(T instance);
        Task UpdateAsync(T instance);
        Task RemoveAsync(string id);
    }
}
