using AnimalRescue.Contracts.BusinessLogic.Interfaces;
using AnimalRescue.Contracts.BusinessLogic.Models;
using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Models;
using AnimalRescue.Infrastructure.Utilities;

using AutoMapper;

using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AnimalRescue.BusinessLogic.Services
{
    internal class AnimalLocationService : BaseService<AnimalLocationDto, AnimalLocation>, IAnimalLocationService
    {
        private readonly IAnimalLocationRepository _animalLocationRepository;
        private readonly IMapper _mapper;

        public AnimalLocationService(IAnimalLocationRepository repository, IMapper mapper) : base(repository, mapper)
        {
            _animalLocationRepository = repository;
            _mapper = mapper;
        }
    }
}
