using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using Telegram.Bot;
using TelegramMessenger.Services.Interfaces;

namespace TelegramMessenger.Services
{
    public class TelegramBot : ITelegramBot
    {
        private TelegramBotClient _client;

        public TelegramBot(IEnumerable<ICommand> commands)
        {
            Commands = new ReadOnlyCollection<ICommand>(commands.ToList());
        }

        public IReadOnlyCollection<ICommand> Commands { get; }

        public TelegramBotClient GetBot(string telegramToken)
        {
            if (_client != null)
            {
                return _client;
            }

            _client = new TelegramBotClient(telegramToken);

            return _client;
        }
    }
}
