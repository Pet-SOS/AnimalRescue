using AnimalRescue.DataAccess.Mongodb.Models;
using System.Threading.Tasks;

namespace AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories
{
    public interface ISequenceRepository
    {
        Task UpdateSequenceAsync(Sequence sequence);
        Task<Sequence> GetCurrentSequenceAsync();
    }
}
