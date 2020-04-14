using AnimalRescue.Contracts.BusinessLogic.Interfaces;
using AnimalRescue.DataAccess.Mongodb.Extensions;
using AnimalRescue.Contracts.BusinessLogic.Models;
using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Models;
using AnimalRescue.DataAccess.Mongodb.Models.Tag;
using AutoMapper;
using System;
using System.Threading.Tasks;
using System.Reflection;
using System.Linq;
using AnimalRescue.Contracts.BusinessLogic.Attributes;
using AnimalRescue.DataAccess.Mongodb.Attributes;

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
            var propertiesDbo = Type.GetType(animalDbo.GetType().AssemblyQualifiedName).GetProperties();
            var propertiesDto = Type.GetType(animalDto.GetType().AssemblyQualifiedName).GetProperties();

            var wellKnownTagPropertiesDbo = propertiesDbo.Where(x => x.PropertyType.GetTypeInfo().Name == typeof(WellKnownTag).Name);
            foreach (var wellKnownTagPropertyDbo in wellKnownTagPropertiesDbo)
            {
                if (wellKnownTagPropertyDbo.GetCustomAttribute<CouplingPropertyNameAttribute>() is CouplingPropertyNameAttribute attributeDbo)
                {
                    string attrValueDbo = attributeDbo.AliasName;
                    foreach (PropertyInfo propertyDto in propertiesDto)
                    {
                        if (propertyDto.GetCustomAttribute<CouplingPropertyDtoAttribute>() is CouplingPropertyDtoAttribute attributeDto)
                        {
                            string attrValueDto = attributeDto.AliasName;
                            if (attrValueDbo == attrValueDto)
                            {
                                var propertyDtoValue = propertyDto.GetValue(animalDto, null);

                                WellKnownTag tag = null;
                                if (propertyDtoValue != null)
                                {
                                    tag = await _wellKnownTagRepository.GetAsync(GetObjectIdString(propertyDtoValue.ToString()));
                                }

                                wellKnownTagPropertyDbo.SetValue(animalDbo, tag);
                            }
                        }
                    }
                }
            }
        }

        private static string GetObjectIdString(string guidString)
        {
            Guid guid;
            Guid.TryParse(guidString, out guid);
            return guid.AsObjectIdString();
        }
    }
}
