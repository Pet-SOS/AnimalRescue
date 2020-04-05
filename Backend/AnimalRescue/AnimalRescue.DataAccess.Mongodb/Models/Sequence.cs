using AnimalRescue.DataAccess.Mongodb.Attributes;
using AnimalRescue.DataAccess.Mongodb.Models.BaseItems;

using MongoDB.Bson.Serialization.Attributes;

using animal = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Animal;

namespace AnimalRescue.DataAccess.Mongodb.Models
{
    [BsonDiscriminator("sequence")]
    public class Sequence : BaseAndTimeItem
    {
        [CouplingPropertyName(animal.Number)]
        [BsonElement("number")]
        public int Number { get; set; }
    }
}
