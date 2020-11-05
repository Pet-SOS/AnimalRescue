
namespace AnimalRescue.BusinessLogic.Configurations
{
    public class EmailPublisherSettings : IEmailPublisherSettings
    {
        public string Exchange { get; set; }
        public string ExchangeType { get; set; }
        public string RoutingKey { get; set; }
    }
}
