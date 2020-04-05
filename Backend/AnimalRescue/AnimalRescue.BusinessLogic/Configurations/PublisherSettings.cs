using System;
using System.Collections.Generic;
using System.Text;

namespace AnimalRescue.BusinessLogic.Configurations
{
    internal class PublisherSettings : IPublisherSettings
    {
        public string HostName { get; set; }
        public string Exchange { get; set; }
        public string ExchangeType { get; set; }
        public string RoutingKey { get; set; }
    }
}
