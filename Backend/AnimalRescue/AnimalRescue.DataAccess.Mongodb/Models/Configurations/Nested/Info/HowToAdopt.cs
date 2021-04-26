using AnimalRescue.Contracts.Common.Constants;
using AnimalRescue.DataAccess.Mongodb.Attributes;

namespace AnimalRescue.DataAccess.Mongodb.Models.Configurations.Nested.Info
{
    [ConfigName(ConfigurationConstants.HowToAdopt)]
    public class HowToAdopt : BaseInfo
    {
    }
}
