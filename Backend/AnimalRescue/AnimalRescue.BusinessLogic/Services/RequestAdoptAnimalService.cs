using AnimalRescue.Contracts.BusinessLogic.Interfaces;
using AnimalRescue.Contracts.BusinessLogic.Models.Messages;
using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Models;
using AutoMapper;
using System;

namespace AnimalRescue.BusinessLogic.Services
{
    internal class RequestAdoptAnimalService:
        BaseService<RequestAdoptAnimalDto, RequestAdoptAnimal, Guid>,
        IBlFullCrud<RequestAdoptAnimalDto, RequestAdoptAnimalDto, Guid>
    {
        public RequestAdoptAnimalService(
            IRequestAdoptAnimalRepository repository,
            IRecoverDataService recoverDataService,
            IMapper mapper)
            : base(repository, recoverDataService, mapper)
        {
        }
    }
}
