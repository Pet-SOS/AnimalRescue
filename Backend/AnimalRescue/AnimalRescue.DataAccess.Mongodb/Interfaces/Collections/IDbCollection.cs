using AnimalRescue.DataAccess.Contracts.Query;
using AnimalRescue.DataAccess.Mongodb.Models;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace AnimalRescue.DataAccess.Mongodb.Interfaces.Collections
{
    public interface IDbCollection<T>
        where T : BaseItem
    {
        Task<List<T>> GetAsync(DbQuery query);
        Task<int> GetCountAsync(DbQuery query);
        Task<T> GetAsync(string id);
        Task<T> CreateAsync(T instance);
        Task UpdateAsync(T instance);
        Task RemoveAsync(string id);
    }
}
