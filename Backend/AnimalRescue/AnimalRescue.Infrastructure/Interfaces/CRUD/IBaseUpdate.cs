using System.Threading.Tasks;

namespace AnimalRescue.Infrastructure.Interfaces.CRUD
{
    public interface IBaseUpdate<TIn>
    {
        Task UpdateAsync(TIn instanse);
    }
}
