using System;
using System.Threading.Tasks;
using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Models;
using AnimalRescue.DataAccess.Mongodb.QueryBuilders;
using MongoDB.Driver;

namespace AnimalRescue.DataAccess.Mongodb.Repositories
{
    internal class RefreshTokenRepository : BaseCollection<RefreshToken>, IRefreshTokenRepository
    {
        public RefreshTokenRepository(IMongoDatabase database, IQueryBuilder<RefreshToken> queryBuilder)
            : base(database, queryBuilder)
        {
        }

        public async Task<RefreshToken> GetByToken(string token)
        {
            var refreshToken = (await Collection.FindAsync(queryBuilder.Where(x => x.Token == token))).SingleOrDefault();

            return refreshToken;
        }

        public async Task DeleteExpiredByUserId(string userId)
        {
           await Collection.DeleteManyAsync(queryBuilder.Where(x => x.UserId == userId && x.ExpiredAt < DateTime.UtcNow));
        }
    }
}
