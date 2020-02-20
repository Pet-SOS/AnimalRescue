using AnimalRescue.Contracts.BusinessLogic.Interfaces;
using AnimalRescue.Contracts.BusinessLogic.Models;
using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Models;

using AutoMapper;

namespace AnimalRescue.BusinessLogic.Services
{
    internal class AnimalService : BaseService<AnimalDto, Animal>, IBlFullCrud<AnimalDto, AnimalDto>
    {
        public AnimalService(IAnimalRepository repository, IMapper mapper) 
            : base(repository, mapper)
        {
        }   
    }
}
