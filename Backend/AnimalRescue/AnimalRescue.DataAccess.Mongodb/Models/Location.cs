using AnimalRescue.DataAccess.Mongodb.Attributes;
using AnimalRescue.DataAccess.Mongodb.Models.BaseItems;
using AnimalRescue.DataAccess.Mongodb.Models.Tag;

using MongoDB.Bson.Serialization.Attributes;

using common = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Common;
using person = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Person;

namespace AnimalRescue.DataAccess.Mongodb.Models
{
    [BsonDiscriminator("locations")]
    public class Location : BaseAndTimeItem
    {
        [CouplingPropertyName(common.Title)]
        [BsonElement("title")]
        public string Title { get; set; }

        [CouplingPropertyName(person.Phone)]
        [BsonElement("phone")]
        public string Phone { get; set; }

        [CouplingPropertyName(person.Address)]
        [BsonElement("address")]
        public string Address { get; set; }

        [CouplingPropertyName(common.Price)]
        [BsonElement("price")]
        public string Price { get; set; }

        [CouplingPropertyName(common.Type)]
        [BsonElement("type")]
        public WellKnownTag Type { get; set; }
    }
}
