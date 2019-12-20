using AnimalRescue.DataAccess.Mongodb.Models;
using AnimalRescue.DataAccess.Mongodb.Query;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories
{
    public interface IAnimalRepository
    {
        Task<List<Animal>> GetAnimalsAsync(DbQuery query);
        Task<int> GetAnimalCountAsync(DbQuery query);
        Task<Animal> GetAnimalAsync(string id);
        Task UpdateAnimalAsync(Animal instanse);
        Task DeleteAnimalAsync(string id);
        Task<Animal> CreateAnimalAsync(Animal instanse);
    }
}
