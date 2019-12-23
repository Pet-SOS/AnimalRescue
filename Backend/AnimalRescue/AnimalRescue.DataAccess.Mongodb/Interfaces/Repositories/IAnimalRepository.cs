using AnimalRescue.Contracts.Common.Interfaces.CRUD;
using AnimalRescue.DataAccess.Mongodb.Models;
using AnimalRescue.DataAccess.Mongodb.Query;

using System.Collections.Generic;

namespace AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories
{
    public interface IAnimalRepository :
        IBaseQuerAsyncy<List<Animal>, DbQuery>,
        IBaseQuerAsyncy<Animal, string>,
        IBaseCountQueryAsync<DbQuery>,
        IBaseCreateAsync<Animal>,
        IBaseUpdateAsync<Animal>,
        IBaseDeleteAsync<string>
    {
    }
}
