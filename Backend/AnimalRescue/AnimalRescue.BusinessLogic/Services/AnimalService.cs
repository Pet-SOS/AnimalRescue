using AnimalRescue.Contracts.BusinessLogic.Interfaces;
using AnimalRescue.DataAccess.Mongodb.Extensions;
using AnimalRescue.Contracts.BusinessLogic.Models;
using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Models;
using AnimalRescue.DataAccess.Mongodb.Models.Tag;
using AutoMapper;
using System;
using System.Threading.Tasks;

namespace AnimalRescue.BusinessLogic.Services
{
    internal class AnimalService : BaseService<AnimalDto, Animal>, IBlFullCrud<AnimalDto, AnimalDto>
    {
        private IWellKnownTagRepository _wellKnownTagRepository;

        public AnimalService(IAnimalRepository repository,
                             IWellKnownTagRepository wellKnownTagRepository,
                             IMapper mapper) 
            : base(repository, mapper)
        {
            _wellKnownTagRepository = wellKnownTagRepository;
        }

        public override async Task<AnimalDto> CreateAsync(AnimalDto animalDto)
        {
            animalDto.Id = Guid.Empty;
            var animalDbo = _mapper.Map<AnimalDto, Animal>(animalDto);
            await UpdateAnimalDbo(animalDbo, animalDto);

            animalDbo = await _repository.CreateAsync(animalDbo);
            animalDto = _mapper.Map<Animal, AnimalDto>(animalDbo);

            return animalDto;
        }


        public override async Task UpdateAsync(AnimalDto animalDto)
        {
            var animalDbo = _mapper.Map<AnimalDto, Animal>(animalDto);
            await UpdateAnimalDbo(animalDbo, animalDto);

            await _repository.UpdateAsync(animalDbo);
        }

        private async Task UpdateAnimalDbo(Animal animalDbo, AnimalDto animalDto)
        {
            WellKnownTag status = await _wellKnownTagRepository.GetAsync(GetObjectIdString(animalDto.Status));
            animalDbo.Status = status;
            WellKnownTag locationType = await _wellKnownTagRepository.GetAsync(GetObjectIdString(animalDto.LocationType));
            animalDbo.LocationType = locationType;
            WellKnownTag locationName = await _wellKnownTagRepository.GetAsync(GetObjectIdString(animalDto.LocationName));
            animalDbo.LocationName = locationName;
        }

        private static string GetObjectIdString(string guidString)
        {
            Guid guid;
            Guid.TryParse(guidString, out guid);
            return guid.AsObjectIdString();
        }
    }
}
