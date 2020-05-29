using System;
using System.Collections.Generic;
using System.Text;

namespace AnimalRescue.BusinessLogic.Configurations
{
    public class PublisherSettings : IPublisherSettings
    {
        public string HostName { get; set; }
        public string Exchange { get; set; }
        public string ExchangeType { get; set; }
        public string RoutingKey { get; set; }
        public string UserName { get; set; }
        public string UserPassword { get; set; }
        public int HostPort { get; set; }
        public string TelegramKey { get; set; }
    }
}
