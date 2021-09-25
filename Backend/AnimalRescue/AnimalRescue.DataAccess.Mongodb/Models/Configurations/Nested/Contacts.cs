using AnimalRescue.Contracts.Common.Constants;
using AnimalRescue.DataAccess.Mongodb.Attributes;

using MongoDB.Bson.Serialization.Attributes;

using System.Collections.Generic;

using cms = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Cms;
using person = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Person;

namespace AnimalRescue.DataAccess.Mongodb.Models.Configurations.Nested
{
    [ConfigName(ConfigurationConstants.CmsConfigurationName)]
    public class Contacts : Info.BaseInfo
    {
        [CouplingPropertyName(cms.Phones)]
        [BsonElement("phones")]
        public List<string> Phones { get; set; }

        [CouplingPropertyName(cms.SocialLinks)]
        [BsonElement("socialLinks")]
        public Dictionary<string, string> SocialLinks { get; set; }

        [CouplingPropertyName(person.Emails)]
        [BsonElement("emails")]
        public Dictionary<string, string> Emails { get; set; }

        [CouplingPropertyName(person.Addresses)]
        [BsonElement("addresses")]
        public Dictionary<string, string> Addresses { get; set; }
    }
}
