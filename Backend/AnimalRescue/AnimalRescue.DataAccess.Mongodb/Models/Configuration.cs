using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;

namespace AnimalRescue.DataAccess.Mongodb.Models
{
    public class Configuration : BaseItem
    {
        [BsonElement("name")]
        public string Name { get; set; }

        [BsonElement("phones")]
        public List<string> Phones { get; set; }

        [BsonElement("socialLinks")]
        public Dictionary<string, string> SocialLinks { get; set; }
    }
}
