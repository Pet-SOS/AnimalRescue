using System.Threading.Tasks;

namespace AnimalRescue.Infrastructure.Interfaces.CRUD
{
    public interface IBaseCreateAsync<TIn> :
        IBaseCreateAsync<TIn, TIn>
    {
    }
    public interface IBaseCreateAsync<Tout,TIn>
    {
        Task<Tout> CreateAsync(TIn value);
    }
}
