using AnimalRescue.DataAccess.Contracts.Query;
using AnimalRescue.Models.DTO.Models;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace AnimalRescue.DataAccess.Contracts.Interfaces
{
    public interface IAnimalRepository
    {
        Task<List<AnimalDto>> GetAnimalsAsync(DbQuery query);
        Task<int> GetAnimalCountAsync(DbQuery query);
        Task<AnimalDto> GetAnimalAsync(string id);
        Task UpdateAnimalAsync(AnimalDto instanse);
        Task DeleteAnimalAsync(string id);
        Task DeleteAnimalAsync(AnimalDto instanse);
        Task<AnimalDto> CreateAnimalAsync(AnimalDto instanse);
    }
}
