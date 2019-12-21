using System.Threading.Tasks;

namespace AnimalRescue.Contracts.Common.Interfaces.CRUD
{
    public interface IBaseCreateAsync<TIn> :
        IBaseCreateAsync<TIn, TIn>
    {
    }
    public interface IBaseCreateAsync<Tout, TIn>
    {
        Task<Tout> CreateAsync(TIn value);
    }
}
