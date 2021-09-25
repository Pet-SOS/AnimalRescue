using AnimalRescue.BusinessLogic.Configurations;
using AnimalRescue.Contracts.BusinessLogic.Interfaces;
using AnimalRescue.Infrastructure.Validation;

using RabbitMQ.Client;

using System.Text;
using AnimalRescue.Contracts.BusinessLogic.Models.EventMessages;
using Newtonsoft.Json;
using System.Collections.Generic;
using System;

namespace AnimalRescue.BusinessLogic.Services
{
    internal class EventEmittingService : IEventEmittingService
    {
        readonly IEmailPublisherSettings _emailPublisherSettings;
        readonly ITelegramPublisherSettings _telegramPublisherSettings;
        readonly Dictionary<Type, Action<string>> _publishMessageActionsBasedOnMessageType;

        ConnectionFactory _factory;
        IConnection _connection;
        IModel _channel;

        public EventEmittingService(IPublisherSettings publisherSettings, 
            IEmailPublisherSettings emailPublisherSettings, ITelegramPublisherSettings telegramPublisherSettings)
        {
            Require.Objects.NotNull(publisherSettings, nameof(publisherSettings));
            Require.Objects.NotNull(emailPublisherSettings, nameof(emailPublisherSettings));
            Require.Objects.NotNull(telegramPublisherSettings, nameof(telegramPublisherSettings));

            _emailPublisherSettings = emailPublisherSettings;
            _telegramPublisherSettings = telegramPublisherSettings;

            Require.Strings.NotNullOrWhiteSpace(publisherSettings.HostName, nameof(publisherSettings.HostName));
            Require.Strings.NotNullOrWhiteSpace(publisherSettings.UserPassword, nameof(publisherSettings.UserPassword));
            Require.Strings.NotNullOrWhiteSpace(publisherSettings.UserName, nameof(publisherSettings.UserName));

            _factory = new ConnectionFactory()
            {
                HostName = publisherSettings.HostName,
                Port = publisherSettings.HostPort,
                Password = publisherSettings.UserPassword,
                UserName = publisherSettings.UserName
            };

            _connection = _factory.CreateConnection();
            _channel = _connection.CreateModel();

            DeclareExcange(telegramPublisherSettings);
            DeclareExcange(emailPublisherSettings);

            _publishMessageActionsBasedOnMessageType = InitializePublishMessageActionsBasedOnMessageType();
        }

        public void PublishMessage<TMessage>(TMessage message)
            where TMessage : IEventMessage
        {
            string data = JsonConvert.SerializeObject(message);

            if (_publishMessageActionsBasedOnMessageType.TryGetValue(typeof(TMessage), out Action<string> action))
                action(data);
            else
                throw new NotSupportedException($"{typeof(TMessage)} message type is not supported.");
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
                        PublishMessage(message, _telegramPublisherSettings.Exchange, _telegramPublisherSettings.RoutingKey);
                    }
                },
                {
                    typeof(AdoptAnimalEmailMessage), (message) =>
                    {
                        PublishMessage(message, _emailPublisherSettings.Exchange, _emailPublisherSettings.RoutingKey);
                    }
                }
            };

            return publishActions;
        }

        private void DeclareExcange(ISenderPublisherSettingsBase senderPublisherSettings)
        {
            Require.Strings.NotNullOrWhiteSpace(senderPublisherSettings.Exchange, nameof(senderPublisherSettings.Exchange));
            Require.Strings.NotNullOrWhiteSpace(senderPublisherSettings.ExchangeType, nameof(senderPublisherSettings.ExchangeType));
            Require.Strings.NotNullOrWhiteSpace(senderPublisherSettings.RoutingKey, nameof(senderPublisherSettings.RoutingKey));

            _channel.ExchangeDeclare(
                exchange: senderPublisherSettings.Exchange,
                type: senderPublisherSettings.ExchangeType);
        }
    }
}
