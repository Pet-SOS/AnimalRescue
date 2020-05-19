using AnimalRescue.DataAccess.Mongodb.Models.BaseItems;
using AnimalRescue.DataAccess.Mongodb.Query;

using MongoDB.Bson;
using MongoDB.Driver;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace AnimalRescue.DataAccess.Mongodb.Interfaces
{
    public interface IBaseCollection<T>
        where T : IBaseAuditItem
    {
        IMongoCollection<T> Collection { get; }
        IMongoCollection<BsonDocument> NativeCollection { get; }
        Task<List<T>> GetAsync(DbQuery query);
        Task<int> GetCountAsync(DbQuery query);
        Task<T> GetAsync(string id);
        Task<T> CreateAsync(T instance);
        Task<IEnumerable<T>> CreateAsync(IEnumerable<T> instances);
        Task CreateAsync(BsonDocument instance);
        Task UpdateAsync(T instance);
        Task DeleteAsync(string id);
        IAsyncEnumerable<T> GetAllItemsAsync();
    }
}
