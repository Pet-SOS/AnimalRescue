using AnimalRescue.Contracts.Query;
using AnimalRescue.Models.DTO.Models;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace AnimalRescue.Contracts.Services
{
    public interface IAnimalService
    {
        Task<(List<AnimalDto> collection, int fullCollectionCount)> GetAnimalsAsync(ApiQueryRequest queryRequest);
        Task<AnimalDto> GetAnimalAsync(string id);
        Task<AnimalDto> CreateAnimalAsync(AnimalDto animalModel, List<byte[]> images = null);
        Task<AnimalDto> CreateAnimalAsync(AnimalDto animalModel);
        Task UpdateAnimalAsync(AnimalDto animalModel);
    }
}
