
namespace AnimalRescue.BusinessLogic.Configurations
{
    public interface ITelegramPublisherSettings : ISenderPublisherSettingsBase
    {
        string TelegramKey { get; set; }
    }
}
