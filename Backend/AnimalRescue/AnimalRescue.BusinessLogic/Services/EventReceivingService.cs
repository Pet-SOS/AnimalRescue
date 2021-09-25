using AnimalRescue.BusinessLogic.Configurations;
using AnimalRescue.Contracts.BusinessLogic.Interfaces;
using AnimalRescue.Contracts.BusinessLogic.Models.EventMessages;
using AnimalRescue.Infrastructure.Validation;

using Newtonsoft.Json;

using RabbitMQ.Client;
using RabbitMQ.Client.Events;

using System;
using System.Linq;
using System.Text;

namespace AnimalRescue.BusinessLogic.Services
{
    public class EventReceivingService : IEventReceivingService, IDisposable
    {
        readonly string _exchange;
        readonly string _exchangeType;
        readonly string _routingKey;

        private readonly ConnectionFactory _factory;
        private IConnection _connection;
        private IModel _channel;

        public EventReceivingService(IPublisherSettings publisherSettings, ISenderPublisherSettingsBase senderSettings)
        {
            Require.Objects.NotNull(publisherSettings, nameof(publisherSettings));
            Require.Strings.NotNullOrWhiteSpace(senderSettings.Exchange, nameof(senderSettings.Exchange));
            Require.Strings.NotNullOrWhiteSpace(senderSettings.ExchangeType, nameof(senderSettings.ExchangeType));
            Require.Strings.NotNullOrWhiteSpace(publisherSettings.HostName, nameof(publisherSettings.HostName));
            Require.Strings.NotNullOrWhiteSpace(senderSettings.RoutingKey, nameof(senderSettings.RoutingKey));
            Require.Strings.NotNullOrWhiteSpace(publisherSettings.UserPassword, nameof(publisherSettings.UserPassword));
            Require.Strings.NotNullOrWhiteSpace(publisherSettings.UserName, nameof(publisherSettings.UserName));

            _factory = new ConnectionFactory()
            {
                HostName = publisherSettings.HostName,
                Port = publisherSettings.HostPort,
                Password = publisherSettings.UserPassword,
                UserName = publisherSettings.UserName
            };


            _exchange = senderSettings.Exchange;
            _exchangeType = senderSettings.ExchangeType;
            _routingKey = senderSettings.RoutingKey;

        }

        public void Run<TMessage>(Action<TMessage> action)
            where TMessage : IEventMessage
        {
            _connection = _factory.CreateConnection();
            _channel = _connection.CreateModel();
            
            _channel.ExchangeDeclare(
                exchange: _exchange,
                type: _exchangeType);
            var queueName = _channel.QueueDeclare().QueueName;
            
            _channel.QueueBind(queue: queueName,
                exchange: _exchange,
                routingKey: _routingKey);
            
            var consumer = new EventingBasicConsumer(_channel);
            consumer.Received += (model, ea) =>
            {
                var body = ea.Body;
                var message = Encoding.UTF8.GetString(body.ToArray());

                TMessage data = JsonConvert.DeserializeObject<TMessage>(message);

                action?.Invoke(data);
            };

            _channel.BasicConsume(queue: queueName,
                autoAck: true,
                consumer: consumer);
        }

        #region IDisposable Support
        private bool disposedValue = false; // To detect redundant calls

        protected virtual void Dispose(bool disposing)
        {
            if (!disposedValue)
            {
                if (disposing)
                {
                    // TODO: dispose managed state (managed objects).
                }

                // TODO: free unmanaged resources (unmanaged objects) and override a finalizer below.
                // TODO: set large fields to null.
                _connection?.Dispose();
                _channel?.Dispose();

                disposedValue = true;
            }
        }

        // TODO: override a finalizer only if Dispose(bool disposing) above has code to free unmanaged resources.
        // ~EventReceivingService()
        // {
        //   // Do not change this code. Put cleanup code in Dispose(bool disposing) above.
        //   Dispose(false);
        // }

        // This code added to correctly implement the disposable pattern.
        void IDisposable.Dispose()
        {
            // Do not change this code. Put cleanup code in Dispose(bool disposing) above.
            Dispose(true);
            // TODO: uncomment the following line if the finalizer is overridden above.
            // GC.SuppressFinalize(this);
        }
        #endregion
    }
}
