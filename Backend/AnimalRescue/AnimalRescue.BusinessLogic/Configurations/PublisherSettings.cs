
namespace AnimalRescue.BusinessLogic.Configurations
{
    public class PublisherSettings : IPublisherSettings
    {
        public string HostName { get; set; }
        public string UserName { get; set; }
        public string UserPassword { get; set; }
        public int HostPort { get; set; }
    }
}
