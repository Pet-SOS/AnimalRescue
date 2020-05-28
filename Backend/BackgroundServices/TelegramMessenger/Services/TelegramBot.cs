using System.Collections.Generic;
using Telegram.Bot;
using TelegramMessenger.Services.Commands;
using TelegramMessenger.Services.Interfaces;

namespace TelegramMessenger.Services
{
    public static class TelegramBot
    {
        private static TelegramBotClient _client;
        private static List<ICommand> _commands;

        public static IReadOnlyList<ICommand> Commands => _commands.AsReadOnly();

        public static TelegramBotClient GetBot()
        {
            if (_client != null)
            {
                return _client;
            }

            _commands = new List<ICommand> { new HelloCommand(), new RegisterCommand(), new MessageCommand() };

            _client = new TelegramBotClient(TelegramBotSettings.Key);

            return _client;
        }
    }
}
