using AnimalRescue.DataAccess.Mongodb.Attributes;
using AnimalRescue.DataAccess.Mongodb.Models.BaseItems;

using MongoDB.Bson.Serialization.Attributes;

using common = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Common;
using animal = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Animal;
using person = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Person;

using AnimalRescue.DataAccess.Mongodb.Models.Tag;

namespace AnimalRescue.DataAccess.Mongodb.Models
{
    [BsonDiscriminator("request")]
    public class Request : BaseAndTimeItem
    {
        [CouplingPropertyName(common.Case)]
        [BsonElement("case")]
        public WellKnownTag Case { get; set; }

        [CouplingPropertyName(animal.KindOfAnimal)]
        [BsonElement("kindOfAnimal")]
        public string KindOfAnimal { get; set; }

        [CouplingPropertyName(animal.Status)]
        [BsonElement("status")]
        public WellKnownTag Status { get; set; }

        [CouplingPropertyName(animal.Age)]
        [BsonElement("age")]
        public int Age { get; set; }

        [CouplingPropertyName(person.Address)]
        [BsonElement("address")]
        public string Address { get; set; }

        [CouplingPropertyName(person.FirstName)]
        [BsonElement("firstName")]
        public string FirstName { get; set; }

        [CouplingPropertyName(person.LastName)]
        [BsonElement("lastName")]
        public string LastName { get; set; }

        [CouplingPropertyName(person.Phone)]
        [BsonElement("phone")]
        public string Phone { get; set; }
    }
}
