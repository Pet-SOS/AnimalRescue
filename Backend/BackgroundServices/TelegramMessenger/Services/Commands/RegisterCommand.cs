using System.Threading.Tasks;
using Telegram.Bot;
using Telegram.Bot.Types;
using TelegramMessenger.Models;
using TelegramMessenger.Services.Interfaces;

namespace TelegramMessenger.Services.Commands
{
    public class RegisterCommand : ICommand
    {
        private readonly IChatRepository<ChatDto> _repository;

        public RegisterCommand()
        {
            _repository = new ChatRepository();
        }

        public string Name => "/register";

        public async Task ExecuteAsync(Message message, TelegramBotClient client)
        {
            var chatId = message.Chat.Id;

            var name = !string.IsNullOrEmpty(message.Chat.Title)
                ? message.Chat.Title
                : $"{message.Chat.FirstName} {message.Chat.LastName}";

            var chat = new ChatDto
            {
                Id = chatId,
                Name = name
            };

            await _repository.CreateAsync(chat);

            await client.SendTextMessageAsync(chatId, $"Chat registered with a name {name}");
        }
    }
}
