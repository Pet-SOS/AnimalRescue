using System.Threading.Tasks;

namespace AnimalRescue.Contracts.Common.Interfaces.CRUD
{
    public interface IBaseDeleteAsync<TId>
    {
        Task DeleteAsync(TId id);
    }
}
