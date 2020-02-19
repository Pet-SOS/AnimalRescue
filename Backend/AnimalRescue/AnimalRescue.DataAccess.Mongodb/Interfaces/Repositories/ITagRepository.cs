using AnimalRescue.Contracts.Common.Interfaces.CRUD;
using AnimalRescue.DataAccess.Mongodb.Models;

using System.Collections.Generic;

namespace AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories
{
    public interface ITagRepository : IBaseRepository<Tags>,
        IBaseVoidCreateAsync<IEnumerable<Tags>>,
        IBaseWhereAsync<List<Tags>, List<Tags>>
    {
    }
}
