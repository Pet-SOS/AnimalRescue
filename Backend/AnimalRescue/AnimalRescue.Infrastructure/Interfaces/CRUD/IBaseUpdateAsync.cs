using System.Threading.Tasks;

namespace AnimalRescue.Infrastructure.Interfaces.CRUD
{
    public interface IBaseUpdateAsync<TIn>
    {
        Task UpdateAsync(TIn value);
    }
}
