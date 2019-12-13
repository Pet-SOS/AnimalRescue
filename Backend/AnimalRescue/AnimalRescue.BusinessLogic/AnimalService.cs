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

        public async Task<AnimalModel> AddAnimalAsync(AnimalModel animal, List<byte[]> images = null)
        {
            // Save images -> get ids -> add ids to animal image links
            var data = await animalRepository.CreateAnimalAsync(animal);

            return data;
        }

        public async Task<List<AnimalModel>> GetAnimalsAsync(int currentPage = 1, int pageSize = 10)
        {
            var data = await animalRepository.GetAnimalsAsync(currentPage, pageSize);

            return data;
        }

        public async Task<AnimalModel> GetAnimalAsync(string id)
        {
            var data = await animalRepository.GetAnimalAsync(id);

            return data;
        }
    }
}
