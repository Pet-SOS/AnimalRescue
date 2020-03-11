using MongoDB.Bson.Serialization.Attributes;

namespace AnimalRescue.DataAccess.Mongodb.Models
{
    [BsonDiscriminator("securityTokens")]
    public class SecurityToken: BaseItems.BaseAndTimeItem
    {
        [BsonElement("token")]
        public string Token { get; set; }

        [BsonElement("type")]
        public string Type { get; set; }
    }
}
