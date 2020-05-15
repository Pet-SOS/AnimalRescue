using AnimalRescue.Contracts.Common.Constants;
using AnimalRescue.DataAccess.Mongodb.Attributes;
using MongoDB.Bson.Serialization.Attributes;
using common = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Common;

namespace AnimalRescue.DataAccess.Mongodb.Models.Configurations.Nested
{
    [ConfigName(ConfigurationConstants.Donation)]
    public class Donation
    {
        [CouplingPropertyName(common.Body)]
        [BsonElement("body")]
        public string Body { get; set; } 
    }
}
