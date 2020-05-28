using System.Threading.Tasks;
using Telegram.Bot;
using Telegram.Bot.Types;
using TelegramMessenger.Services.Interfaces;

namespace TelegramMessenger.Services.Commands
{
    public class MessageCommand : ICommand
    {
        public string Name => "message";

        public async Task ExecuteAsync(Message message, TelegramBotClient client)
        {
            var chatId = message.Chat.Id;
            var messageId = message.MessageId;
            var messageText = message.Text;

            await client.SendTextMessageAsync(chatId, messageText, replyToMessageId: messageId);
        }
    }
}
