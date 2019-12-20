using System.Threading.Tasks;

namespace AnimalRescue.Infrastructure.Interfaces.CRUD
{
    public interface IBaseCountQuery<TQuery>
    {
        Task<int> GetCountAsync(TQuery query);
    }
}
