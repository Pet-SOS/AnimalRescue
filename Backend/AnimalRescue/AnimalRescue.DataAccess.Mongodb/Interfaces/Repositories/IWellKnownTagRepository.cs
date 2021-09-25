using AnimalRescue.Contracts.Common.Interfaces.CRUD;
using AnimalRescue.DataAccess.Mongodb.Models.Tag;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories
{
    public interface IWellKnownTagRepository : 
        IBaseRepository<WellKnownTag>,
        IBaseCreateAsync<IEnumerable<WellKnownTag>, IEnumerable<WellKnownTag>>,
        IBaseWhereAsync<List<WellKnownTag>, List<WellKnownTag>>
    {
        Task<List<WellKnownTag>> WhereByIdAsync(List<WellKnownTag> tags);
    }
}
