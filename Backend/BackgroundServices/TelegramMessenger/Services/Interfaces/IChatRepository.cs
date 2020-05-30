using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;

namespace TelegramMessenger.Services.Interfaces
{
    public interface IChatRepository<TEntity> : IBaseRepository<TEntity>
    {
    }
}
