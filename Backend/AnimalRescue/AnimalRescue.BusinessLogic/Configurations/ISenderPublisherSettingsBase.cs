
namespace AnimalRescue.BusinessLogic.Configurations
{
    public interface ISenderPublisherSettingsBase
    {
        string Exchange { get; set; }
        string ExchangeType { get; set; }
        string RoutingKey { get; set; }
    }
}
