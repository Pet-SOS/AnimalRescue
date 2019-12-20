using AnimalRescue.DataAccess.Mongodb.Models;
using AnimalRescue.DataAccess.Mongodb.Query;
using AnimalRescue.Infrastructure.Interfaces.CRUD;

using System.Collections.Generic;

namespace AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories
{
    public interface IAnimalRepository :
        IBaseQuery<List<Animal>, DbQuery>,
        IBaseQuery<Animal, string>,
        IBaseCountQuery<DbQuery>,
        IBaseCreate<Animal>,
        IBaseUpdate<Animal>,
        IBaseDelete<string>
    {
    }
}
