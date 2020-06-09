using AnimalRescue.DataAccess.Mongodb.Query;
using MongoDB.Bson;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TelegramMessenger.Models;
using TelegramMessenger.Services.Interfaces;

namespace TelegramMessenger.Services
{
    public class ChatRepository : IChatRepository<ChatDto>
    {
        private static List<ChatDto> _chats;

        public ChatRepository()
        {
            _chats = new List<ChatDto>();
        }

        public async Task<List<ChatDto>> GetAsync(DbQuery query)
        {
            return _chats;
        }

        public async Task<ChatDto> GetAsync(string query)
        {
            if (long.TryParse(query, out var id))
            {
                return _chats.FirstOrDefault(ch => ch.Id == id);
            }

            return null;
        }

        public async IAsyncEnumerable<ChatDto> GetAllItemsAsync()
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

        public async Task<ChatDto> CreateAsync(ChatDto chat)
        {
            if (_chats.All(ch => ch.Id != chat.Id))
            {
                _chats.Add(chat);
            }

            return chat;
        }

        public async Task UpdateAsync(ChatDto newChat)
        {
            var chat = _chats.FirstOrDefault(ch => ch.Id == newChat.Id);

            if (chat != null)
            {
                chat.Name = newChat.Name;
            }
            else
            {
                _chats.Add(newChat);
            }
        }

        public async Task DeleteAsync(string id)
        {
            if (long.TryParse(id, out var idLong))
            {
                _chats.RemoveAll(ch => ch.Id == idLong);
            }
        }

        public async Task<BsonValue> ExecuteScriptAsync(string javascript)
        {
            return BsonNull.Value;
        }
    }
}
