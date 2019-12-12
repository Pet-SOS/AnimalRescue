using AnimalRescue.Models.DTO.Models;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace AnimalRescue.Contracts.Services
{
    public interface IAnimalService
    {
        Task<List<AnimalModel>> GetAnimalAsync(int currentPage = 1, int pageSize = 10);
        Task<AnimalModel> GetAnimalAsync(string id);
        Task<AnimalModel> AddAnimalAsync(AnimalModel animal, List<byte[]> images = null);
    }
}
