using AnimalRescue.DataAccess.Mongodb.Attributes;

using MongoDB.Bson.Serialization.Attributes;

using cms = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Cms;
using person = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Person;

namespace AnimalRescue.DataAccess.Mongodb.Models.Configurations.Nested
{
    public class BankCard
    {
        [CouplingPropertyName(cms.CardNumber)]
        [BsonElement("cardNumber")] 
        public string CardNumber { get; set; }

        [CouplingPropertyName(cms.EDRPOU)]
        [BsonElement("edrpou")] 
        public string EDRPOU { get; set; }

        [CouplingPropertyName(cms.BankName)]
        [BsonElement("bankName")] 
        public string BankName { get; set; }

        [CouplingPropertyName(person.FirstName)]
        [BsonElement("firstName")] 
        public string FirstName { get; set; }

        [CouplingPropertyName(person.LastName)]
        [BsonElement("lastName")] 
        public string LastName { get; set; }
    }
}
