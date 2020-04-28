using System;
using AnimalRescue.BusinessLogic.Services;
using AnimalRescue.Contracts.BusinessLogic.Models.EvemtMessages;
using TelegramMessenger.Services.Interfaces;

namespace TelegramMessenger
{
    class Program
    {
        private static IMessenger _messenger;

        static void Main(string[] args)
        {
            //using EventReceivingService eventReceivingService = new EventReceivingService(null);

            _messenger = new Services.TelegramMessenger();

            _messenger.Init();

            //eventReceivingService.Run<EmergencyMessage>((message) => _messenger.SendTextMessageAsync("1232"));

            bool isContinue = true;

            while (isContinue)
            {
               var text = Console.ReadLine();

               if (text == "stop")
               {
                   isContinue = false;
               }
               else
               {
                   _messenger.SendTextMessageAsync(text);
               }
            }
        }
    }
}
