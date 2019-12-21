using System.Threading.Tasks;

namespace AnimalRescue.Infrastructure.Interfaces.CRUD
{
    public interface IBaseDeleteAsync<TId>
    {
        Task DeleteAsync(TId id);
    }
}
