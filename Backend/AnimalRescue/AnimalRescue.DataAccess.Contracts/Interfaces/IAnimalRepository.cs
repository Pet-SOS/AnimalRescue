using AnimalRescue.Models.DTO.Models;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace AnimalRescue.DataAccess.Contracts.Interfaces
{
    public interface IAnimalRepository
    {
        Task<(List<AnimalDto> collection, int fullCollectionCount)> GetAnimalsAsync(int currentPage, int pageSize);
        Task<long> GetAnimalCountAsync();
        Task<AnimalDto> GetAnimalAsync(string id);
        Task UpdateAnimalAsync(AnimalDto instanse);
        Task DeleteAnimalAsync(string id);
        Task DeleteAnimalAsync(AnimalDto instanse);
        Task<AnimalDto> CreateAnimalAsync(AnimalDto instanse);
    }
}
