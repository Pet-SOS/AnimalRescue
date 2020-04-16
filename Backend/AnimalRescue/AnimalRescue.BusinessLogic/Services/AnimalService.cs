using AnimalRescue.Contracts.BusinessLogic.Interfaces;
using AnimalRescue.Contracts.BusinessLogic.Models;
using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Models;

using AutoMapper;

using System;

namespace AnimalRescue.BusinessLogic.Services
{
    internal class AnimalService : 
        BaseService<AnimalDto, Animal, Guid>, 
        IBlFullCrud<AnimalDto, AnimalDto, Guid>
    {
        public AnimalService(IAnimalRepository repository,
            IWellKnownTagRepository wellKnownTagRepository,
            IMapper mapper)
            : base(repository, wellKnownTagRepository, mapper)
        {
        }
    }
}
