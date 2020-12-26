using AnimalRescue.Contracts.Common.Constants;
using AnimalRescue.DataAccess.Mongodb.Attributes;

namespace AnimalRescue.DataAccess.Mongodb.Models.Configurations.Nested.Info
{
    [ConfigName(ConfigurationConstants.Home)]
    public class Home : BaseInfo
    {
    }
}
