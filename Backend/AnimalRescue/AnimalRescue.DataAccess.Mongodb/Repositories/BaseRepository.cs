using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Models.BaseItems;
using AnimalRescue.DataAccess.Mongodb.Query;
using MongoDB.Bson;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AnimalRescue.DataAccess.Mongodb.Repositories
{
    internal class BaseRepository<TEntity> : IBaseRepository<TEntity> where TEntity : IBaseAuditItem
    {
        protected BaseCollection<TEntity> _baseCollection;

        public BaseRepository(BaseCollection<TEntity> baseCollection)
        {
            _baseCollection = baseCollection;
        }

        public Task<TEntity> CreateAsync(TEntity value)
        {
            return _baseCollection.CreateAsync(value);
        }

        public Task DeleteAsync(string id)
        {
            return _baseCollection.DeleteAsync(id);
        }

        public Task<BsonValue> ExecuteScriptAsync(string javascript)
        {
            return _baseCollection.ExecuteScriptAsync(javascript);
        }

        public IAsyncEnumerable<TEntity> GetAllItemsAsync()
        {
            return _baseCollection.GetAllItemsAsync();
        }

        public Task<List<TEntity>> GetAsync(DbQuery query)
        {
           return _baseCollection.GetAsync(query);
        }

        public Task<TEntity> GetAsync(string query)
        {
            return _baseCollection.GetAsync(query);
        }

        public Task<int> GetCountAsync(DbQuery query)
        {
            return _baseCollection.GetCountAsync(query);
        }

        public Task UpdateAsync(TEntity value)
        {
            return _baseCollection.UpdateAsync(value);
        }
    }
}
