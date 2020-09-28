using AnimalRescue.DataAccess.Mongodb.Models.BaseItems;
using MongoDB.Bson.Serialization.Attributes;
using AnimalRescue.DataAccess.Mongodb.Attributes;

using requestAdoptAnimal = AnimalRescue.Contracts.Common.Constants.PropertyConstants.RequestAdoptAnimal;
using person = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Person;

namespace AnimalRescue.DataAccess.Mongodb.Models
{
    [BsonDiscriminator("request_adopt_animals")]
    public class RequestAdoptAnimal : BaseAndTimeItem
    {
        [CouplingPropertyName(requestAdoptAnimal.AnimalId)]
        [BsonElement("animalId")]
        public string AnimalId { get; set; }

        [CouplingPropertyName(requestAdoptAnimal.AnimalName)]
        [BsonElement("animalName")]
        public string AnimalName { get; set; }

        [CouplingPropertyName(requestAdoptAnimal.AdoptiveName)]
        [BsonElement("adoptiveName")]
        public string AdoptiveName { get; set; }

        [CouplingPropertyName(person.Phone)]
        [BsonElement("phoneNumber")]
        public string PhoneNumber { get; set; }
    }
}
