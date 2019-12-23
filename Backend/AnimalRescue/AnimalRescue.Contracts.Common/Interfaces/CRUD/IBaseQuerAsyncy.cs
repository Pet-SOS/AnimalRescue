using System.Threading.Tasks;

namespace AnimalRescue.Contracts.Common.Interfaces.CRUD
{
    public interface IBaseQuerAsyncy<TOut, TQuery>
    {
        Task<TOut> GetAsync(TQuery query);
    }
}
