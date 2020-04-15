using AnimalRescue.Contracts.Common.Interfaces.CRUD;
using AnimalRescue.DataAccess.Mongodb.Models;
using System.Collections.Generic;

namespace AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories
{
    public interface IAnimalLocationRepository : IBaseRepository<AnimalLocation>,
        IBaseVoidCreateAsync<IEnumerable<AnimalLocation>>,
        IBaseWhereAsync<List<AnimalLocation>, List<AnimalLocation>>
    {
    }
}
