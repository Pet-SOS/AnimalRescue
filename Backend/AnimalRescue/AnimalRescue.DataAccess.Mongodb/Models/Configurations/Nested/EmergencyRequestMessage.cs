using AnimalRescue.Contracts.Common.Constants;
using AnimalRescue.DataAccess.Mongodb.Attributes;

namespace AnimalRescue.DataAccess.Mongodb.Models.Configurations.Nested
{
    [ConfigName(ConfigurationConstants.EmergencyRequestMessage)]
    public class EmergencyRequestMessage
    {
        public string Body { get; set; }
    }
}
