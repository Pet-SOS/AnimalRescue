using AnimalRescue.Contracts.Common.Constants;
using AnimalRescue.DataAccess.Mongodb.Attributes;
using AnimalRescue.DataAccess.Mongodb.Models.BaseItems;

using MongoDB.Bson.Serialization.Attributes;

using System.Collections.Generic;

using common = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Common;
using person = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Person;

namespace AnimalRescue.DataAccess.Mongodb.Models.Configurations.Nested
{
    [ConfigName(ConfigurationConstants.HomePopup)]
    public class HomePopup
    {
        [CouplingPropertyName(common.Title)]
        [BsonElement("title")]
        public List<LanguageValue> Title { get; set; }

        [CouplingPropertyName(common.Text)]
        [BsonElement("text")]
        public List<LanguageValue> Text { get; set; }

        [CouplingPropertyName(person.Email)]
        [BsonElement("email")]
        public string Email { get; set; }
    }
}
