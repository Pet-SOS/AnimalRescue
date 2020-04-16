using AnimalRescue.Contracts.Common.Interfaces.CRUD;
using AnimalRescue.DataAccess.Mongodb.Models.Tag;
using System.Collections.Generic;

namespace AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories
{
    public interface IWellKnownTagRepository : IBaseRepository<WellKnownTag>,
        //IBaseVoidCreateAsync<IEnumerable<WellKnownTag>>,
        IBaseCreateAsync<IEnumerable<WellKnownTag>, IEnumerable<WellKnownTag>>,
        IBaseWhereAsync<List<WellKnownTag>, List<WellKnownTag>>
    {
    }
}
