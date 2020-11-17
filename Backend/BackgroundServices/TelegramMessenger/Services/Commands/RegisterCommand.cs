using System.Threading.Tasks;
using Telegram.Bot;
using Telegram.Bot.Types;
using TelegramMessenger.Models;
using TelegramMessenger.Services.Interfaces;

namespace TelegramMessenger.Services.Commands
{
    public class RegisterCommand : ICommand
    {
        private readonly IChatRepository<Models.Chat> _repository;

        public RegisterCommand()
        {
        }

        public string Name => "/register";

        public async Task ExecuteAsync(Message message, TelegramBotClient client)
        {
            var chatId = message.Chat.Id;

            var name = !string.IsNullOrEmpty(message.Chat.Title)
                ? message.Chat.Title
                : $"{message.Chat.FirstName} {message.Chat.LastName}";


            await client.SendTextMessageAsync(chatId, $"Chat registered with a name {name}");
        }
    }
}
