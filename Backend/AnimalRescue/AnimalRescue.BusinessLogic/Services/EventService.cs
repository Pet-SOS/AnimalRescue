using AnimalRescue.BusinessLogic.Configurations;
using AnimalRescue.Infrastructure.Validation;

using RabbitMQ.Client;

using System.Text;

namespace AnimalRescue.BusinessLogic.Services
{
    internal class EventService
    {
        readonly string _exchange;
        readonly string _routingKey;

        ConnectionFactory _factory;
        IConnection _connection;
        IModel _channel;

        public EventService(IPublisherSettings publisherSettings)
        {
            Require.Objects.NotNull(publisherSettings, nameof(publisherSettings));
            Require.Strings.NotNullOrWhiteSpace(publisherSettings.Exchange, nameof(publisherSettings.Exchange));
            Require.Strings.NotNullOrWhiteSpace(publisherSettings.ExchangeType, nameof(publisherSettings.ExchangeType));
            Require.Strings.NotNullOrWhiteSpace(publisherSettings.HostName, nameof(publisherSettings.HostName));
            Require.Strings.NotNullOrWhiteSpace(publisherSettings.RoutingKey, nameof(publisherSettings.RoutingKey));

            _factory = new ConnectionFactory() { HostName = publisherSettings.HostName };
            _connection = _factory.CreateConnection();
            _channel = _connection.CreateModel();

            _exchange = publisherSettings.Exchange;
            _routingKey = publisherSettings.RoutingKey;

            _channel.ExchangeDeclare(
                exchange: _exchange,
                type: publisherSettings.ExchangeType);
        }

        public void PublishMessage(string message)
        {
            var body = Encoding.UTF8.GetBytes(message);

            _channel.BasicPublish(exchange: _exchange,
                                 routingKey: _routingKey,
                                 basicProperties: null,
                                 body: body);
        }
    }
}
