using System.Threading.Tasks;

namespace AnimalRescue.Contracts.Common.Interfaces.CRUD
{
    public interface IBaseWhereAsync<TOut, TIn>
    {
        Task<TOut> WhereAsync(TIn value);
    }
}
