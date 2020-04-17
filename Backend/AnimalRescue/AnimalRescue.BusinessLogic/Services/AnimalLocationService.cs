using AnimalRescue.Contracts.BusinessLogic.Interfaces;
using AnimalRescue.Contracts.BusinessLogic.Models;
using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Models;

using AutoMapper;

using System;

namespace AnimalRescue.BusinessLogic.Services
{
    internal class AnimalLocationService : 
        BaseService<AnimalLocationDto, AnimalLocation, Guid>, 
        IAnimalLocationService
    {
        public AnimalLocationService(
            IAnimalLocationRepository repository,
            IWellKnownTagRepository wellKnownTagRepository,
            IMapper mapper)
            : base(repository, wellKnownTagRepository, mapper)
        {
        }
    }
}
