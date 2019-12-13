using AnimalRescue.Models.DTO.Models;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace AnimalRescue.Contracts.Services
{
    public interface IAnimalService
    {
        Task<List<AnimalDto>> GetAnimalsAsync(int currentPage = 1, int pageSize = 10);
        Task<AnimalDto> GetAnimalAsync(string id);
        Task<AnimalDto> CreateAnimalAsync(AnimalDto animal, List<byte[]> images = null);
        Task<AnimalDto> CreateAnimalAsync(AnimalDto animal);
    }
}
