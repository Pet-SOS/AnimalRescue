using AnimalRescue.DataAccess.Mongodb.Attributes;
using AnimalRescue.DataAccess.Mongodb.Models.BaseItems;
using AnimalRescue.DataAccess.Mongodb.Models.Tag;

using MongoDB.Bson.Serialization.Attributes;

using animal = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Animal;
using common = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Common;
using person = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Person;

namespace AnimalRescue.DataAccess.Mongodb.Models
{
    [BsonDiscriminator("animalLocations")]
    public class AnimalLocation : BaseAndTimeItem
    {
        [CouplingPropertyName(common.Name)]
        [BsonElement("name")]
        public string Name { get; set; }

        [CouplingPropertyName(person.Phone)]
        [BsonElement("phone")]
        public string Phone { get; set; }

        [CouplingPropertyName(person.Address)]
        [BsonElement("address")]
        public string Address { get; set; }

        [CouplingPropertyName(common.Price)]
        [BsonElement("price")]
        public string Price { get; set; }

        [CouplingPropertyName(animal.LocationType)]
        [BsonElement("locationType")]
        public WellKnownTag LocationType { get; set; }
    }
}
