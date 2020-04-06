using AnimalRescue.DataAccess.Mongodb.Models.BaseItems;
using MongoDB.Bson.Serialization.Attributes;

namespace AnimalRescue.DataAccess.Mongodb.Models
{
    [BsonDiscriminator("sequence")]
    public class Sequence : BaseAndTimeItem
    {
        [BsonElement("number")]
        public int Number { get; set; }
    }
}
