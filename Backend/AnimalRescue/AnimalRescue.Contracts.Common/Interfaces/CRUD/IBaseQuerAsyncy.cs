using System.Threading.Tasks;

namespace AnimalRescue.Contracts.Common.Interfaces.CRUD
{
    public interface IBaseQueryAsync<TOut, TQuery>
    {
        Task<TOut> GetAsync(TQuery query);
    }
}
