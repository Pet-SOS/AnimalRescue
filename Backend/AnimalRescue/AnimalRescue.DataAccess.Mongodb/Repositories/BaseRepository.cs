using AnimalRescue.DataAccess.Mongodb.Interfaces;
using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Models.BaseItems;
using AnimalRescue.DataAccess.Mongodb.Query;
using AnimalRescue.Infrastructure.Validation;
using MongoDB.Bson;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AnimalRescue.DataAccess.Mongodb.Repositories
{
    internal class BaseRepository<TEntity> :
        IBaseRepository<TEntity> where TEntity : IBaseAuditItem
    {
        protected readonly IBaseCollection<TEntity> baseCollection;

        public BaseRepository(IBaseCollection<TEntity> baseCollection)
        {
            Require.Objects.NotNull(baseCollection, nameof(baseCollection));

            this.baseCollection = baseCollection;
        }

        public virtual Task<TEntity> CreateAsync(TEntity value) => baseCollection.CreateAsync(value);

        public virtual Task DeleteAsync(string id) => baseCollection.DeleteAsync(id);

        public virtual Task<BsonValue> ExecuteScriptAsync(string javascript) => baseCollection.ExecuteScriptAsync(javascript);

        public virtual IAsyncEnumerable<TEntity> GetAllItemsAsync() => baseCollection.GetAllItemsAsync();

        public virtual Task<List<TEntity>> GetAsync(DbQuery query) => baseCollection.GetAsync(query);

        public virtual Task<TEntity> GetAsync(string query) => baseCollection.GetAsync(query);

        public virtual Task<int> GetCountAsync(DbQuery query) => baseCollection.GetCountAsync(query);

        public virtual Task UpdateAsync(TEntity value) => baseCollection.UpdateAsync(value);
    }
}
