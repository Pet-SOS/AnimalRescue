using AnimalRescue.Contracts.Common.Interfaces.CRUD;
using AnimalRescue.DataAccess.Mongodb.Models.Tag;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories
{
    public interface ITagLargeRepository : 
        IBaseRepository<TagLarge>,
        IBaseCreateAsync<IEnumerable<TagLarge>, IEnumerable<TagLarge>>,
        IBaseWhereAsync<List<TagLarge>, List<TagLarge>>
    {
        Task<List<TagLarge>> WhereByIdAsync(List<TagLarge> tags);
    }
}
