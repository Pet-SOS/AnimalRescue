using AnimalRescue.DataAccess.Mongodb.Models;
using System.Threading.Tasks;

namespace AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories
{
    public interface ISequenceRepository
    {
        Task<Sequence> GetAsync();
        Task<Sequence> CreateAsync(Sequence sequence);
        Task UpdateAsync(Sequence sequence);
    }
}
