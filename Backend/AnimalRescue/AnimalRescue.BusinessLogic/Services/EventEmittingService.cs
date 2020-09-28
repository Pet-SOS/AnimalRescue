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
        readonly Dictionary<Type, Action> _typeMessagesPublisherSettings;
        string _exchange;
        string _routingKey;

        ConnectionFactory _factory;
        IConnection _connection;
        IModel _channel;

        public EventEmittingService(IReadOnlyCollection<IPublisherSettings> publisherSettings)
        {
            Require.Objects.NotNull(publisherSettings, nameof(publisherSettings));
            _publisherSettings = publisherSettings;

            _typeMessagesPublisherSettings = new Dictionary<Type, Action>
            {
                {
                    typeof(EmergencyMessage), () =>
                    {
                        IPublisherSettings settings = publisherSettings.First(s => s.Exchange == "topic_telegram");
                        SetNeccessaryPublisherSettings(settings);
                    }
                },
                {
                    typeof(AdoptAnimalEmailMessage), () =>
                    {
                        IPublisherSettings settings = publisherSettings.First(s => s.Exchange == "topic_sendEmail");
                        SetNeccessaryPublisherSettings(settings);
                    }
                }
            };
        }

        public void PublishMessage<TMessage>(TMessage message)
            where TMessage : IEventMessage
        {
            _typeMessagesPublisherSettings[typeof(TMessage)]();

            string data = JsonConvert.SerializeObject(message);
            PublishMessage(data);
        }

        public void PublishMessage(string message)
        {
            var body = Encoding.UTF8.GetBytes(message);

            _channel.BasicPublish(exchange: _exchange,
                                 routingKey: _routingKey,
                                 basicProperties: null,
                                 body: body);
        }

        private void SetNeccessaryPublisherSettings(IPublisherSettings publisherSettings)
        {
            Require.Objects.NotNull(publisherSettings, nameof(publisherSettings));
            Require.Strings.NotNullOrWhiteSpace(publisherSettings.Exchange, nameof(publisherSettings.Exchange));
            Require.Strings.NotNullOrWhiteSpace(publisherSettings.ExchangeType, nameof(publisherSettings.ExchangeType));
            Require.Strings.NotNullOrWhiteSpace(publisherSettings.HostName, nameof(publisherSettings.HostName));
            Require.Strings.NotNullOrWhiteSpace(publisherSettings.RoutingKey, nameof(publisherSettings.RoutingKey));
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

            _exchange = publisherSettings.Exchange;
            _routingKey = publisherSettings.RoutingKey;

            _channel.ExchangeDeclare(
                exchange: _exchange,
                type: publisherSettings.ExchangeType);
        }
    }
}
