using System.Threading.Tasks;
using Telegram.Bot;
using Telegram.Bot.Types;
using TelegramMessenger.Services.Interfaces;

namespace TelegramMessenger.Services.Commands
{
    public class HelloCommand : ICommand
    {
        public string Name => "hello";

        public async Task ExecuteAsync(Message message, TelegramBotClient client)
        {
            var chatId = message.Chat.Id;
            var messageId = message.MessageId;

            await client.SendTextMessageAsync(chatId, "Hello!", replyToMessageId: messageId);
        }
    }
}
