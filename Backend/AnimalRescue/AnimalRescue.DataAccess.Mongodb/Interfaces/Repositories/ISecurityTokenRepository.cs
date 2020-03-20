using AnimalRescue.DataAccess.Mongodb.Models;
using System.Threading.Tasks;

namespace AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories
{
    public interface ISecurityTokenRepository: IBaseCollection<SecurityToken>
    {
        Task<SecurityToken> GetByToken(string token);
    }
}
