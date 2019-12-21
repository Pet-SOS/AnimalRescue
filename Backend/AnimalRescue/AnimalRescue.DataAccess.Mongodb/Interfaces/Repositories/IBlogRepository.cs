using AnimalRescue.DataAccess.Mongodb.Models;
using AnimalRescue.DataAccess.Mongodb.Query;
using AnimalRescue.Infrastructure.Interfaces.CRUD;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories
{
    public interface IBlogRepository :
        IBaseQuerAsyncy<List<Blog>, DbQuery>, 
        IBaseCountQueryAsync<DbQuery>
    {
    }
}
