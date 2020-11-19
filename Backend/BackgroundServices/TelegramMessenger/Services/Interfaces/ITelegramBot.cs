using System.Collections.Generic;
using Telegram.Bot;

namespace TelegramMessenger.Services.Interfaces
{
    public interface ITelegramBot
    {
        public IReadOnlyCollection<ICommand> Commands { get; }

        public TelegramBotClient GetBot(string telegramToken);
    }
}
