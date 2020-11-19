using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Query;
using System.Linq;
using System.Threading.Tasks;
using Telegram.Bot;
using Telegram.Bot.Types;
using TelegramMessenger.Services.Interfaces;

namespace TelegramMessenger.Services.Commands
{
    public class RegisterCommand : ICommand
    {
        private readonly IBaseRepository<Models.Chat> _chatRepository;

        public RegisterCommand(IBaseRepository<Models.Chat> chatRepository)
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

            var chat = new Models.Chat
            {
                ChatId = chatId
            };

            await _chatRepository.CreateAsync(chat);

            await client.SendTextMessageAsync(chatId, $"Chat registered with a name {name}");
        }
    }
}
