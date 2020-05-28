using AnimalRescue.DataAccess.Mongodb.Query;
using System.Threading.Tasks;
using Telegram.Bot;
using Telegram.Bot.Args;
using Telegram.Bot.Types.Enums;
using TelegramMessenger.Models;
using TelegramMessenger.Services.Interfaces;

namespace TelegramMessenger.Services
{
    public class TelegramMessenger : IMessenger
    {
        private static TelegramBotClient _bot;

        private static IChatRepository<ChatDto> _chatRepository;

        public TelegramMessenger()
        {
            _chatRepository = new ChatRepository();
        }

        public void Init()
        {
            if (_bot == null)
            {
                _bot = TelegramBot.GetBot();

                _bot.StartReceiving();

                _bot.OnMessage += Bot_OnMessage;
                _bot.OnUpdate += Bot_OnUpdate;
            }
        }

        public async Task SendTextMessageAsync(string message)
        {
            var chats = await _chatRepository.GetAsync(new DbQuery());

            foreach (var chat in chats)
            {
                await _bot.SendTextMessageAsync(chat.Id, message);
            }
        }

        public void Dispose()
        {
            _bot.StopReceiving();
        }

        private void Bot_OnUpdate(object? sender, UpdateEventArgs e)
        {
            foreach (var command in TelegramBot.Commands)
            {
                if (!string.IsNullOrEmpty(e.Update.Message?.Text) && e.Update.Message.Text.Contains(command.Name))
                {
                    command.ExecuteAsync(e.Update.Message, _bot);
                }
            }
        }

        private void Bot_OnMessage(object? sender, MessageEventArgs e)
        {
            if (e.Message.Type == MessageType.Text)
            {
                //ToDo: add logic for receiving messages
                // _bot.SendTextMessageAsync(e.Message.Chat.Id, e.Message.Text);
            }
        }
    }
}
