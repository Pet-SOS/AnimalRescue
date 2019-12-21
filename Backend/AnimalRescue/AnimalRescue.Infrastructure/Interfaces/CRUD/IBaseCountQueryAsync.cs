using System.Threading.Tasks;

namespace AnimalRescue.Infrastructure.Interfaces.CRUD
{
    public interface IBaseCountQueryAsync<TQuery>
    {
        Task<int> GetCountAsync(TQuery query);
    }
}
