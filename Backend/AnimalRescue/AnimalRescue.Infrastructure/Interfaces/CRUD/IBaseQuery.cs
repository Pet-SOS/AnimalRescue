using System.Threading.Tasks;

namespace AnimalRescue.Infrastructure.Interfaces.CRUD
{
    public interface IBaseQuery<TOut, TQuery>
    {
        Task<TOut> GetAsync(TQuery query);
    }
}
