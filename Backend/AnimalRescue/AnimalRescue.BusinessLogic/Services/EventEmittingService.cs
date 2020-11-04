using AnimalRescue.BusinessLogic.Configurations;
using AnimalRescue.Contracts.BusinessLogic.Interfaces;
using AnimalRescue.Infrastructure.Validation;

using RabbitMQ.Client;

using System.Text;
using AnimalRescue.Contracts.BusinessLogic.Models.EventMessages;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Linq;
using System;

namespace AnimalRescue.BusinessLogic.Services
{
    internal class EventEmittingService : IEventEmittingService
    {
        readonly IReadOnlyCollection<IPublisherSettings> _publisherSettings;
        readonly Dictionary<Type, Action<string>> _publishMessageActionsBasedOnMessageType;

        ConnectionFactory _factory;
        IConnection _connection;
        IModel _channel;

        public EventEmittingService(IReadOnlyCollection<IPublisherSettings> publisherSettings)
        {
            Require.Objects.NotNull(publisherSettings, nameof(publisherSettings));
            _publisherSettings = publisherSettings;

            IPublisherSettings telegramSettings = _publisherSettings.First(s => s.Exchange == "topic_telegram");
            Require.Strings.NotNullOrWhiteSpace(telegramSettings.HostName, nameof(telegramSettings.HostName));
            Require.Strings.NotNullOrWhiteSpace(telegramSettings.UserPassword, nameof(telegramSettings.UserPassword));
            Require.Strings.NotNullOrWhiteSpace(telegramSettings.UserName, nameof(telegramSettings.UserName));

            _factory = new ConnectionFactory()
            {
                HostName = telegramSettings.HostName,
                Port = telegramSettings.HostPort,
                Password = telegramSettings.UserPassword,
                UserName = telegramSettings.UserName
            };

            _connection = _factory.CreateConnection();
            _channel = _connection.CreateModel();

            DeclareTelegramExcange(telegramSettings);

            IPublisherSettings emailSettings = _publisherSettings.First(s => s.Exchange == "topic_sendEmail");
            DeclareEmailExcange(emailSettings);

            _publishMessageActionsBasedOnMessageType = InitializePublishMessageActionsBasedOnMessageType();
        }

        public void PublishMessage<TMessage>(TMessage message)
            where TMessage : IEventMessage
        {
            string data = JsonConvert.SerializeObject(message);
            _publishMessageActionsBasedOnMessageType[typeof(TMessage)](data);
        }

        public void PublishMessage(string message, string exchange, string routingKey)
        {
            var body = Encoding.UTF8.GetBytes(message);

            _channel.BasicPublish(exchange: exchange,
                                 routingKey: routingKey,
                                 basicProperties: null,
                                 body: body);
        }

        private Dictionary<Type, Action<string>> InitializePublishMessageActionsBasedOnMessageType()
        {
            Dictionary<Type, Action<string>> publishActions = new Dictionary<Type, Action<string>>
            {
                {
                    typeof(EmergencyMessage), (message) =>
                    {
                        IPublisherSettings settings = _publisherSettings.First(s => s.Exchange == "topic_telegram");
                        PublishMessage(message, settings.Exchange, settings.RoutingKey);
                    }
                },
                {
                    typeof(AdoptAnimalEmailMessage), (message) =>
                    {
                        IPublisherSettings settings = _publisherSettings.First(s => s.Exchange == "topic_sendEmail");
                        PublishMessage(message, settings.Exchange, settings.RoutingKey);
                    }
                }
            };

            return publishActions;
        }

        private void DeclareTelegramExcange(IPublisherSettings publisherSettings)
        {
            Require.Strings.NotNullOrWhiteSpace(publisherSettings.Exchange, nameof(publisherSettings.Exchange));
            Require.Strings.NotNullOrWhiteSpace(publisherSettings.ExchangeType, nameof(publisherSettings.ExchangeType));

            _channel.ExchangeDeclare(
                exchange: publisherSettings.Exchange,
                type: publisherSettings.ExchangeType);
        }

        private void DeclareEmailExcange(IPublisherSettings publisherSettings)
        {
            Require.Strings.NotNullOrWhiteSpace(publisherSettings.Exchange, nameof(publisherSettings.Exchange));
            Require.Strings.NotNullOrWhiteSpace(publisherSettings.ExchangeType, nameof(publisherSettings.ExchangeType));

            _channel.ExchangeDeclare(
                exchange: publisherSettings.Exchange,
                type: publisherSettings.ExchangeType);
        }   
    }
}
