using System.Threading.Tasks;

namespace AnimalRescue.Contracts.Common.Interfaces.CRUD
{
    public interface IBaseCountQueryAsync<TQuery>
    {
        Task<int> GetCountAsync(TQuery query);
    }
}
