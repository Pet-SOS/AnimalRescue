using AnimalRescue.DataAccess.Mongodb.Query;
using System.Threading.Tasks;
using AnimalRescue.BusinessLogic.Configurations;
using Telegram.Bot;
using Telegram.Bot.Args;
using TelegramMessenger.Models;
using TelegramMessenger.Services.Interfaces;
using System.Collections.Generic;
using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;

namespace TelegramMessenger.Services
{
    public class TelegramMessenger : IMessenger
    {
        private readonly ITelegramPublisherSettings _telegramSettings;
        private readonly ITelegramBot _telegramBot;
        private readonly IBaseRepository<Chat> _chatRepository;

        private TelegramBotClient _bot;

        public TelegramMessenger(ITelegramPublisherSettings telegramSettings, ITelegramBot telegramBot, IBaseRepository<Chat> chatRepository)
        {
            _telegramSettings = telegramSettings;
            _telegramBot = telegramBot;
            _chatRepository = chatRepository;
        }

        public void Init()
        {
            if (_bot == null)
            {
                _bot = _telegramBot.GetBot(_telegramSettings.TelegramKey);

                _bot.OnMessage += Bot_OnMessage;

                _bot.StartReceiving();
            }
        }

        public async Task SendTextMessageAsync(string message)
        {
            var chats =  _chatRepository.GetAllItemsAsync();

            await foreach (var chat in chats)
            {
                await _bot.SendTextMessageAsync(chat.ChatId, message);
            }
        }

        public void Dispose()
        {
            _bot.StopReceiving();
        }

        private void Bot_OnMessage(object sender, MessageEventArgs e)
        {
            foreach (var command in _telegramBot.Commands)
            {
                if (command.Contains(e.Message?.Text))
                {
                    command.ExecuteAsync(e.Message, _bot);
                }
            }
        }
    }
}
