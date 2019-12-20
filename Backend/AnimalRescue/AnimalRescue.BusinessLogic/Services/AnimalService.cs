using AnimalRescue.Contracts.Query;
using AnimalRescue.Contracts.Services;
using AnimalRescue.DataAccess.Contracts.Query;
using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Models;
using AnimalRescue.Infrastructure.Validation;
using AnimalRescue.Models.DTO.Models;

using AutoMapper;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace AnimalRescue.BusinessLogic.Services
{
    public class AnimalService : IAnimalService
    {
        private readonly IAnimalRepository animalRepository;
        private readonly IMapper mapper;

        public AnimalService(IAnimalRepository animalRepository, IMapper mapper)
        {
            Require.Objects.NotNull(animalRepository, nameof(animalRepository));
            Require.Objects.NotNull(mapper, nameof(mapper));

            this.animalRepository = animalRepository;
            this.mapper = mapper;
        }

        public async Task<AnimalDto> CreateAnimalAsync(AnimalDto animalDto)
        {
            animalDto.Id = string.Empty;

            var animalDbo = mapper.Map<AnimalDto, Animal>(animalDto);
            animalDbo = await animalRepository.CreateAnimalAsync(animalDbo);
            animalDto = mapper.Map<Animal, AnimalDto>(animalDbo);

            return animalDto;
        }

        public async Task<(List<AnimalDto> collection, int fullCollectionCount)> GetAnimalsAsync(ApiQueryRequest queryRequest)
        {
            var dbQuery = queryRequest.ToDbQuery();
            var animalDbos = await animalRepository.GetAnimalsAsync(dbQuery);
            var animalDtos = mapper.Map<List<Animal>, List<AnimalDto>>(animalDbos);
            var count = await animalRepository.GetAnimalCountAsync(dbQuery);

            return (animalDtos, count);
        }

        public async Task<AnimalDto> GetAnimalAsync(string id)
        {
            var animalDbo = await animalRepository.GetAnimalAsync(id);
            var animalDto = mapper.Map<Animal, AnimalDto>(animalDbo);

            return animalDto;
        }

        public async Task UpdateAnimalAsync(AnimalDto animalDto)
        {
            var animalDbo = mapper.Map<AnimalDto, Animal>(animalDto);

            await animalRepository.UpdateAnimalAsync(animalDbo);
        }

        public async Task DeleteAnimalAsync(string id)
        {
            await animalRepository.DeleteAnimalAsync(id);
        }
    }
}
