using System;
using AnimalRescue.Contracts.BusinessLogic.Interfaces;
using AnimalRescue.Contracts.BusinessLogic.Models.EventMessages;
using AnimalRescue.Infrastructure.Configuration;
using Microsoft.Extensions.DependencyInjection;
using TelegramMessenger.Configurations;
using TelegramMessenger.Services.Interfaces;

namespace TelegramMessenger
{
    class Program
    {
        private static IMessenger _messenger;

        static void Main(string[] args)
        {
            var serviceCollection = new ServiceCollection();

            serviceCollection.AddConfigureTelegramMessanger(ConfigurationUtil.GetConfiguration());

            using var serviceProvider = serviceCollection.BuildServiceProvider();

            IEventReceivingService eventReceivingService = serviceProvider.GetService<IEventReceivingService>();

            _messenger = serviceProvider.GetService<IMessenger>();

            _messenger.Init();

            eventReceivingService.Run<EmergencyMessage>((message) => _messenger.SendTextMessageAsync($"{message.Title} {Environment.NewLine} {message.Message} {Environment.NewLine} {message.Address}"));

            Console.ReadLine();
        }
    }
}