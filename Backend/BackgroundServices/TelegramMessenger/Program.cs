using System;
using AnimalRescue.BusinessLogic.Configurations;
using AnimalRescue.BusinessLogic.Services;
using AnimalRescue.Contracts.BusinessLogic.Models.EventMessages;
using AnimalRescue.Infrastructure.Configuration;
using TelegramMessenger.Services.Interfaces;

namespace TelegramMessenger
{
    class Program
    {
        private static IMessenger _messenger;

        static void Main(string[] args)
        {
            IPublisherSettings publisherSettings = ConfigurationUtil
                .GetConfiguration()
                .GetTypedSection<PublisherSettings>(nameof(PublisherSettings));
            ITelegramPublisherSettings telegramPublisherSettings = ConfigurationUtil
                .GetConfiguration()
                .GetTypedSection<TelegramPublisherSettings>(nameof(TelegramPublisherSettings));

            using EventReceivingService eventReceivingService = new EventReceivingService(publisherSettings, telegramPublisherSettings);

            _messenger = new Services.TelegramMessenger(telegramPublisherSettings);

            _messenger.Init();

            eventReceivingService.Run<EmergencyMessage>((message) => _messenger.SendTextMessageAsync(message.Address));

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
