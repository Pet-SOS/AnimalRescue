using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Models;
using AnimalRescue.DataAccess.Mongodb.QueryBuilders;
using MongoDB.Driver;
using System.Threading.Tasks;

namespace AnimalRescue.DataAccess.Mongodb.Repositories
{
    internal class SecurityTokenRepository : BaseCollection<SecurityToken>, ISecurityTokenRepository
    {

        public SecurityTokenRepository(IMongoDatabase database, IQueryBuilder<SecurityToken> queryBuilder)
            : base(database, queryBuilder)
        {
        }

        public async Task<SecurityToken> GetByToken(string token)
        {
            var securityToken = (await Collection.FindAsync(queryBuilder.Where(x => x.Token == token))).SingleOrDefault();
            return securityToken;

        }
    }
}
