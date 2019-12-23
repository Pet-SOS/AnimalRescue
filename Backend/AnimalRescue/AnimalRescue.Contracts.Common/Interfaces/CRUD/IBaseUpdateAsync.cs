using System.Threading.Tasks;

namespace AnimalRescue.Contracts.Common.Interfaces.CRUD
{
    public interface IBaseUpdateAsync<TIn>
    {
        Task UpdateAsync(TIn value);
    }
}
