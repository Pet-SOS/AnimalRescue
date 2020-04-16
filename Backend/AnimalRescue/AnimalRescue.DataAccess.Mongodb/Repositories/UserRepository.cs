using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Models;
using AnimalRescue.DataAccess.Mongodb.QueryBuilders;

using MongoDB.Driver;

namespace AnimalRescue.DataAccess.Mongodb.Repositories
{
    internal class UserRepository : 
        BaseCollection<ApplicationUser>, 
        IUserRepository
    {
        public UserRepository(
            IMongoDatabase context, 
            IQueryBuilder<ApplicationUser> queryBuilder)
            : base(context, queryBuilder)
        {
        }
    }
}
