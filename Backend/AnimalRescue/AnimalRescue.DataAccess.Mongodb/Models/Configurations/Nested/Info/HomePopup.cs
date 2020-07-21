using AnimalRescue.Contracts.Common.Constants;
using AnimalRescue.DataAccess.Mongodb.Attributes;

using MongoDB.Bson.Serialization.Attributes;

using person = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Person;

namespace AnimalRescue.DataAccess.Mongodb.Models.Configurations.Nested.Info
{
    [ConfigName(ConfigurationConstants.HomePopup)]
    public class HomePopup : BaseInfo
    {
        [CouplingPropertyName(person.Email)]
        [BsonElement("email")]
        public string Email { get; set; }
    }
}
