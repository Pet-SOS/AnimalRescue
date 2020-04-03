using AnimalRescue.DataAccess.Mongodb.Models;

namespace AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories
{
    public interface IUserRepository : IBaseCollection<ApplicationUser>
    {
    }
}
