using AnimalRescue.DataAccess.Mongodb.Interfaces;
using System.Threading.Tasks;
using Telegram.Bot;
using Telegram.Bot.Types;
using TelegramMessenger.Services.Interfaces;
using Chat = AnimalRescue.DataAccess.Mongodb.Models.Chat;

namespace TelegramMessenger.Services.Commands
{
    public class RegisterCommand : ICommand
    {
        private readonly IChatRepository _chatRepository;

        public RegisterCommand(IChatRepository chatRepository)
        {
            _chatRepository = chatRepository;
        }

        public string Name => "/register";

        public async Task ExecuteAsync(Message message, TelegramBotClient client)
        {
            var chatId = message.Chat.Id;

            var name = !string.IsNullOrEmpty(message.Chat.Title)
                ? message.Chat.Title
                : $"{message.Chat.FirstName} {message.Chat.LastName}";

            if (_chatRepository.Get(chatId) != null)
            {
                await client.SendTextMessageAsync(chatId, $"Chat with name {name} has been registered before");
                
                return;
            }

            var chat = new Chat
            {
                ChatId = chatId
            };

            await _chatRepository.CreateAsync(chat);

            await client.SendTextMessageAsync(chatId, $"Chat registered with a name {name}");
        }
    }
}
