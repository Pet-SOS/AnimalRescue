using System;
using System.Threading.Tasks;

namespace TelegramMessenger.Services.Interfaces
{
    public interface IMessenger : IDisposable
    {
        void Init();

        Task SendTextMessageAsync(string message);
    }
}
