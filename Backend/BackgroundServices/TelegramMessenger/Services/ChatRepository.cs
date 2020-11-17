using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Query;
using MongoDB.Bson;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TelegramMessenger.Models;

namespace TelegramMessenger.Services
{
    public class ChatRepository : IBaseRepository<Chat>
    {
        private static List<Chat> _chats;

        public ChatRepository()
        {
            _chats = new List<Chat>();
        }

        public async Task<List<Chat>> GetAsync(DbQuery query)
        {
            return _chats;
        }

        public async Task<Chat> GetAsync(string query)
        {
            

            return null;
        }

        public async IAsyncEnumerable<Chat> GetAllItemsAsync()
        {
            foreach (var chat in _chats)
            {
                yield return chat;
            }
        }

        public async Task<int> GetCountAsync(DbQuery query)
        {
            return _chats.Count;
        }

        public async Task<Chat> CreateAsync(Chat chat)
        {
            if (_chats.All(ch => ch.Id != chat.Id))
            {
                _chats.Add(chat);
            }

            return chat;
        }

        public async Task UpdateAsync(Chat newChat)
        {
            var chat = _chats.FirstOrDefault(ch => ch.Id == newChat.Id);

            
        }

        public async Task DeleteAsync(string id)
        {
            if (long.TryParse(id, out var idLong))
            {
                
            }
        }

        public async Task<BsonValue> ExecuteScriptAsync(string javascript)
        {
            return BsonNull.Value;
        }
    }
}
