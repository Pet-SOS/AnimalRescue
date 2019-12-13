using AnimalRescue.Models.DTO.Models;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace AnimalRescue.DataAccess.Contracts.Interfaces
{
    public interface IAnimalRepository
    {
        Task<List<AnimalModel>> GetAnimalsAsync(int currentPage = 1, int pageSize = 10);
        Task<AnimalModel> GetAnimalAsync(string id);
        Task UpdateAnimalAsync(AnimalModel instanse);
        Task DeleteAnimalAsync(string id);
        Task DeleteAnimalAsync(AnimalModel instanse);
        Task<AnimalModel> CreateAnimalAsync(AnimalModel instanse);
    }
}
