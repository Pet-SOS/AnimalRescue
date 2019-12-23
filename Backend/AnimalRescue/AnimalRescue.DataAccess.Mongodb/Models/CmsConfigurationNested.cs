using AnimalRescue.DataAccess.Mongodb.Attributes;

using MongoDB.Bson.Serialization.Attributes;

using System.Collections.Generic;

using cms = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Cms;

namespace AnimalRescue.DataAccess.Mongodb.Models
{
    public class CmsConfigurationNested
    {
        [CouplingPropertyName(cms.Phones)]
        [BsonElement("phones")]
        public List<string> Phones { get; set; }

        [CouplingPropertyName(cms.SocialLinks)]
        [BsonElement("socialLinks")]
        public Dictionary<string, string> SocialLinks { get; set; }
    }
}
