using AnimalRescue.Contracts.BusinessLogic.Interfaces;
using AnimalRescue.Contracts.BusinessLogic.Models;
using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Models;

using AutoMapper;

using System;

namespace AnimalRescue.BusinessLogic.Services
{
    internal class LocationService : 
        BaseService<LocationDto, Location, Guid>, 
        ILocationService
    {
        public LocationService(
            ILocationRepository repository,
            IRecoverDataService recoverDataService,
            IMapper mapper)
            : base(repository, recoverDataService, mapper)
        {
        }
    }
}
