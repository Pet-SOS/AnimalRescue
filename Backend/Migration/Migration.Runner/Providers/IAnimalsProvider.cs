using System.Collections.Generic;
using System.Threading.Tasks;
using Migration.Runner.Models;

namespace Migration.Runner.Providers
{
    public interface IAnimalsProvider
    {
        Task<IEnumerable<AnimalV0>> GetAnimals();
    }
}
