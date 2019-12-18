using AnimalRescue.Contracts.Query;
using AnimalRescue.Contracts.Services;
using AnimalRescue.DataAccess.Contracts.Interfaces;
using AnimalRescue.DataAccess.Contracts.Query;
using AnimalRescue.Infrastructure.Validation;
using AnimalRescue.Models.DTO.Models;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace AnimalRescue.BusinessLogic
{
    public class AnimalService : IAnimalService
    {
        private readonly IAnimalRepository animalRepository;

        public AnimalService(IAnimalRepository animalRepository)
        {
            Require.Objects.NotNull(animalRepository, nameof(animalRepository));

            this.animalRepository = animalRepository;
        }

        public async Task<AnimalDto> CreateAnimalAsync(AnimalDto animalModel)
        {
            animalModel.Id = string.Empty;
            var data = await animalRepository.CreateAnimalAsync(animalModel);

            return data;
        }

        public async Task<(List<AnimalDto> collection, int fullCollectionCount)> GetAnimalsAsync(ApiQueryRequest queryRequest)
        {
            var dbQuery = queryRequest.ToDbQuery();
            var data = await animalRepository.GetAnimalsAsync(dbQuery);
            var count = await animalRepository.GetAnimalCountAsync(dbQuery);  
           
            return (data, count);
        }

        public async Task<AnimalDto> GetAnimalAsync(string id)
        {
            var data = await animalRepository.GetAnimalAsync(id);

            return data;
        }

        public async Task UpdateAnimalAsync(AnimalDto animalModel)
        {
            await animalRepository.UpdateAnimalAsync(animalModel);
        }

        public async Task DeleteAnimalAsync(string id)
        {
            await animalRepository.DeleteAnimalAsync(id);
        }
    }
}
