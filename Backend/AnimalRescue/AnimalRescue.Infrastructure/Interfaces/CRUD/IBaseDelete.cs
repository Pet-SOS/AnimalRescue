using System.Threading.Tasks;

namespace AnimalRescue.Infrastructure.Interfaces.CRUD
{
    public interface IBaseDelete<TId>
    {
        Task DeleteAsync(TId id);
    }
}
