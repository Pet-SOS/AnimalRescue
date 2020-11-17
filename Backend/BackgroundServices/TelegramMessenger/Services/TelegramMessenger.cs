using AnimalRescue.DataAccess.Mongodb.Query;
using System.Threading.Tasks;
using AnimalRescue.BusinessLogic.Configurations;
using Telegram.Bot;
using Telegram.Bot.Args;
using TelegramMessenger.Models;
using TelegramMessenger.Services.Interfaces;

namespace TelegramMessenger.Services
{
    public class TelegramMessenger : IMessenger
    {
        private readonly ITelegramPublisherSettings _telegramSettings;
        private static TelegramBotClient _bot;

        private static IChatRepository<Chat> _chatRepository;

        public TelegramMessenger(ITelegramPublisherSettings telegramSettings)
        {
            _telegramSettings = telegramSettings;
        }

        public void Init()
        {
            if (_bot == null)
            {
                _bot = TelegramBot.GetBot(_telegramSettings.TelegramKey);

                _bot.OnMessage += Bot_OnMessage;

                _bot.StartReceiving();
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

        private void Bot_OnMessage(object sender, MessageEventArgs e)
        {
            foreach (var command in TelegramBot.Commands)
            {
                if (command.Contains(e.Message?.Text))
                {
                    command.ExecuteAsync(e.Message, _bot);
                }
            }
        }
    }
}
