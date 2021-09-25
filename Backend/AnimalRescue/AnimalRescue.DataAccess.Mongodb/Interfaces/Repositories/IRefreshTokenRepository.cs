using System.Threading.Tasks;
using AnimalRescue.DataAccess.Mongodb.Models;

namespace AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories
{
    public interface IRefreshTokenRepository : IBaseRepository<RefreshToken>
    {
        Task<RefreshToken> GetByToken(string token);
        Task DeleteExpiredByUserId(string userId);
    }
}
