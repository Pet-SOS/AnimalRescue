using System;
using System.Threading.Tasks;
using AnimalRescue.DataAccess.Mongodb.Interfaces;
using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Models;
using MongoDB.Driver;

namespace AnimalRescue.DataAccess.Mongodb.Repositories
{
    internal class RefreshTokenRepository : BaseRepository<RefreshToken>, IRefreshTokenRepository
    {
        public RefreshTokenRepository(IBaseCollection<RefreshToken> baseCollection) : base(baseCollection)
        {
        }

        public async Task<RefreshToken> GetByToken(string token)
        {
            var refreshToken = (await baseCollection.Collection.FindAsync(x => x.Token == token)).SingleOrDefault();

            return refreshToken;
        }

        public async Task DeleteExpiredByUserId(string userId)
        {
            await baseCollection.Collection.DeleteManyAsync(x => x.UserId == userId && x.ExpiredAt < DateTime.UtcNow);
        }
    }
}
