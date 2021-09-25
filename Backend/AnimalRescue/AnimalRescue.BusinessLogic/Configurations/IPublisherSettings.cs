
namespace AnimalRescue.BusinessLogic.Configurations
{
    public interface IPublisherSettings
    {
        string UserName { get; set; }
        string UserPassword { get; set; }
        string HostName { get; set; }
        int HostPort { get; set; }
    }
}
