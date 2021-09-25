using System.Threading.Tasks;
using Telegram.Bot;
using Telegram.Bot.Types;

namespace TelegramMessenger.Services.Interfaces
{
    public interface ICommand
    {
        public string Name { get; }

        public Task ExecuteAsync(Message message, TelegramBotClient client);

        public bool Contains(string command)
        {
            return !string.IsNullOrEmpty(command) &&  command.Contains(Name);
        }

    }
}
