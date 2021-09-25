using AnimalRescue.DataAccess.Mongodb.Interfaces;
using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Models;
using AnimalRescue.DataAccess.Mongodb.QueryBuilders;

using MongoDB.Driver;

using System.Threading.Tasks;

namespace AnimalRescue.DataAccess.Mongodb.Repositories
{
    internal class SecurityTokenRepository :
        BaseRepository<SecurityToken>,
        ISecurityTokenRepository
    {
        public SecurityTokenRepository(IBaseCollection<SecurityToken> baseCollection) : base(baseCollection)
        {
        }

        public async Task<SecurityToken> GetByToken(string token)
        {
            var securityToken = (await baseCollection.Collection.FindAsync(x => x.Token == token)).SingleOrDefault();

            return securityToken;
        }
    }
}
