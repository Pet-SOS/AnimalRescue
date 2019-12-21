using System.Threading.Tasks;

namespace AnimalRescue.Infrastructure.Interfaces.CRUD
{
    public interface IBaseQuerAsyncy<TOut, TQuery>
    {
        Task<TOut> GetAsync(TQuery query);
    }
}
