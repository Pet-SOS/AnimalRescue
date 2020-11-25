using AnimalRescue.DataAccess.Mongodb.Interfaces;
using AnimalRescue.DataAccess.Mongodb.Models;
using System.Threading.Tasks;
using MongoDB.Driver;

namespace AnimalRescue.DataAccess.Mongodb.Repositories
{
    internal class ChatRepository : BaseRepository<Chat>, IChatRepository
    {
        public ChatRepository(IBaseCollection<Chat> baseCollection) : base(baseCollection)
        {
        }

        public async Task<Chat> Get(long chatId)
        {
            return (await baseCollection.Collection.FindAsync(c => c.ChatId == chatId)).FirstOrDefault();
        }
    }
}
