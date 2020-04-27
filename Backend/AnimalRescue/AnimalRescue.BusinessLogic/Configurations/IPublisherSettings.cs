using System;
using System.Collections.Generic;
using System.Text;

namespace AnimalRescue.BusinessLogic.Configurations
{
    internal interface IPublisherSettings
    {
        string UserName { get; set; }
        string UserPassword { get; set; }
        string HostName { get; set; }
        int HostPort { get; set; }
        string Exchange { get; set; }
        string ExchangeType { get; set; }
        string RoutingKey { get; set; } 
    }
}
