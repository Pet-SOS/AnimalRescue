using AnimalRescue.Contracts.Common.Constants;
using AnimalRescue.DataAccess.Mongodb.Attributes;

using MongoDB.Bson.Serialization.Attributes;

using cms = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Cms;
using common = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Common;

namespace AnimalRescue.DataAccess.Mongodb.Models.Configurations.Nested
{
    [ConfigName(ConfigurationConstants.Donation)]
    public class Donation
    {
        [CouplingPropertyName(cms.BankCard)]
        [BsonElement("bankCard")]
        public BankCard BankCard { get; set; }

        [CouplingPropertyName(common.Title)]
        [BsonElement("title")]
        public string Title { get; set; }

        [CouplingPropertyName(common.Body)]
        [BsonElement("body")]
        public string Body { get; set; } 
    }
}
