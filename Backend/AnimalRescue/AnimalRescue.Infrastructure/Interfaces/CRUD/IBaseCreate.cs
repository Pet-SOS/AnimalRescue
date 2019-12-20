using System.Threading.Tasks;

namespace AnimalRescue.Infrastructure.Interfaces.CRUD
{
    public interface IBaseCreate<TIn>
    {
        Task<TIn> CreateAsync(TIn instanse);
    }
}
