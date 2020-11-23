using AnimalRescue.BusinessLogic.Configurations;
using AnimalRescue.BusinessLogic.Services;
using AnimalRescue.Contracts.BusinessLogic.Interfaces;
using AnimalRescue.DataAccess.Mongodb;
using AnimalRescue.Infrastructure.Configuration;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using TelegramMessenger.Services;
using TelegramMessenger.Services.Commands;
using TelegramMessenger.Services.Interfaces;

namespace TelegramMessenger.Configurations
{
    internal static class TelegramMessangerConfigureExtension
    {
        public static void AddConfigureTelegramMessanger(
            this IServiceCollection services,
            IConfiguration configuration)
        {
            IPublisherSettings publisherSettings = configuration
                .GetTypedSection<PublisherSettings>(nameof(PublisherSettings));
            ITelegramPublisherSettings telegramPublisherSettings = configuration
                .GetTypedSection<TelegramPublisherSettings>(nameof(TelegramPublisherSettings));


            services.AddConfigureMongoDb(ConfigurationUtil.GetConfiguration());
            services.AddScoped((p) => publisherSettings);
            services.AddScoped((p) => telegramPublisherSettings);
            services.AddScoped<ISenderPublisherSettingsBase>((p) => telegramPublisherSettings);
            services.AddScoped<IEventReceivingService, EventReceivingService>();
            services.AddScoped<IMessenger, Services.TelegramMessenger>();
            services.AddScoped<ICommand, RegisterCommand>();
            services.AddSingleton<ITelegramBot, TelegramBot>();
        }
    }
}
