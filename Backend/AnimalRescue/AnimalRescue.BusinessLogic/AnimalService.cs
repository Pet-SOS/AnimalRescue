using AnimalRescue.Contracts.Query;
using AnimalRescue.Contracts.Services;
using AnimalRescue.DataAccess.Contracts.Interfaces;
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

        public async Task<AnimalDto> CreateAnimalAsync(AnimalDto animalModel, List<byte[]> images = null)
        {
            // Save images -> get ids -> add ids to animal image links
            var data = await animalRepository.CreateAnimalAsync(animalModel);

            return data;
        }

        public async Task<AnimalDto> CreateAnimalAsync(AnimalDto animalModel)
        {
            var data = await animalRepository.CreateAnimalAsync(animalModel);

            return data;
        }

        public async Task<List<AnimalDto>> GetAnimalsAsync(ApiQueryRequest queryRequest)
        {
            var data = await animalRepository.GetAnimalsAsync(queryRequest.Page, queryRequest.Size);

            return data;
        }

        public async Task<AnimalDto> GetAnimalAsync(string id)
        {
            var data = await animalRepository.GetAnimalAsync(id);

            return data;
        }
    }
}
