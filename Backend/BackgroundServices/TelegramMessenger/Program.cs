using System;
using AnimalRescue.BusinessLogic.Configurations;
using AnimalRescue.BusinessLogic.Services;
using AnimalRescue.Contracts.BusinessLogic.Interfaces;
using AnimalRescue.Contracts.BusinessLogic.Models.EventMessages;
using AnimalRescue.DataAccess.Mongodb;
using AnimalRescue.Infrastructure.Configuration;
using Microsoft.Extensions.DependencyInjection;
using TelegramMessenger.Services;
using TelegramMessenger.Services.Commands;
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

            var serviceCollection = new ServiceCollection();

            serviceCollection.AddConfigureMongoDb(ConfigurationUtil.GetConfiguration());
            serviceCollection.AddScoped((p) => publisherSettings);
            serviceCollection.AddScoped((p) => telegramPublisherSettings);
            serviceCollection.AddScoped<ISenderPublisherSettingsBase>((p) => telegramPublisherSettings);
            serviceCollection.AddScoped<IEventReceivingService, EventReceivingService>();
            serviceCollection.AddScoped<IMessenger, Services.TelegramMessenger>();
            serviceCollection.AddScoped<ICommand, MessageCommand>();
            serviceCollection.AddScoped<ICommand, RegisterCommand>();
            serviceCollection.AddScoped<ICommand, HelloCommand>();
            serviceCollection.AddSingleton<ITelegramBot, TelegramBot>();

            using var serviceProvider = serviceCollection.BuildServiceProvider();

            IEventReceivingService eventReceivingService = serviceProvider.GetService<IEventReceivingService>();

            _messenger = serviceProvider.GetService<IMessenger>();

            _messenger.Init();

            eventReceivingService.Run<EmergencyMessage>((message) => _messenger.SendTextMessageAsync($"{message.Title} {Environment.NewLine} {message.Message} {Environment.NewLine} {message.Address}"));

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