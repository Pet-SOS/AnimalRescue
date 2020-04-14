using AnimalRescue.Contracts.BusinessLogic.Attributes;
using AnimalRescue.Contracts.BusinessLogic.Interfaces;
using AnimalRescue.Contracts.BusinessLogic.Models;
using AnimalRescue.Contracts.BusinessLogic.Models.Tag;
using AnimalRescue.DataAccess.Mongodb.Attributes;
using AnimalRescue.DataAccess.Mongodb.Extensions;
using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Models;
using AnimalRescue.DataAccess.Mongodb.Models.Tag;

using AutoMapper;

using System;
using System.Linq;
using System.Reflection;
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
            await RecoverWellKnownTagsAsync(animalDbo, animalDto);

            animalDbo = await _repository.CreateAsync(animalDbo);
            animalDto = _mapper.Map<Animal, AnimalDto>(animalDbo);

            return animalDto;
        }


        public override async Task UpdateAsync(AnimalDto animalDto)
        {
            var animalDbo = _mapper.Map<AnimalDto, Animal>(animalDto);
            await RecoverWellKnownTagsAsync(animalDbo, animalDto);

            await _repository.UpdateAsync(animalDbo);
        }

        private async Task RecoverWellKnownTagsAsync(Animal animalDbo, AnimalDto animalDto)
        {
            var propertiesDto = animalDto.GetType().GetProperties();

            foreach (var wellKnownTagPropertyDbo in animalDbo
                .GetType()
                .GetProperties()
                .Where(x => x.PropertyType == typeof(WellKnownTag)))
            {
                foreach (PropertyInfo propertyDto in propertiesDto)
                {
                    if (propertyDto.GetCustomAttribute<CouplingPropertyDtoAttribute>() is CouplingPropertyDtoAttribute attributeDto
                        && wellKnownTagPropertyDbo.GetCustomAttribute<CouplingPropertyNameAttribute>() is CouplingPropertyNameAttribute attributeDbo
                        && attributeDto.AliasName == attributeDbo.AliasName
                        && propertyDto.GetValue(animalDto, null) is WellKnownTagDto propertyDtoValue
                        && (await _wellKnownTagRepository.GetAsync(propertyDtoValue.Id.AsObjectIdString().ToString())) is WellKnownTag tag)
                    {
                        wellKnownTagPropertyDbo.SetValue(animalDbo, tag);
                    }
                }
            }
        }
    }
}
