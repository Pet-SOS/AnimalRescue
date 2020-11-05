
namespace AnimalRescue.BusinessLogic.Configurations
{
    public class TelegramPublisherSettings : ITelegramPublisherSettings
    {        
        public string Exchange { get; set; }
        public string ExchangeType { get; set; }
        public string RoutingKey { get; set; }
        public string TelegramKey { get; set; }
    }
}
