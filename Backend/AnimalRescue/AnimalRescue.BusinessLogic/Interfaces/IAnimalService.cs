using AnimalRescue.BusinessLogic.Models;
using AnimalRescue.Contracts.Query;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace AnimalRescue.Contracts.Services
{
    public interface IAnimalService
    {
        Task<(List<AnimalDto> collection, int fullCollectionCount)> GetAnimalsAsync(ApiQueryRequest queryRequest);
        Task<AnimalDto> GetAnimalAsync(string id);
        Task<AnimalDto> CreateAnimalAsync(AnimalDto animalModel);
        Task UpdateAnimalAsync(AnimalDto animalModel);
        Task DeleteAnimalAsync(string id);
    }
}
