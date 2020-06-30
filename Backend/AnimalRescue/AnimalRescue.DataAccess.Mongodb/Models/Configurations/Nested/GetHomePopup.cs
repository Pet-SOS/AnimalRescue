using AnimalRescue.Contracts.Common.Constants;
using AnimalRescue.DataAccess.Mongodb.Attributes;
using MongoDB.Bson.Serialization.Attributes;

using person = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Person;
using common = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Common;
using AnimalRescue.DataAccess.Mongodb.Models.Tag;
using AnimalRescue.DataAccess.Mongodb.Models.BaseItems;

namespace AnimalRescue.DataAccess.Mongodb.Models.Configurations.Nested
{
    [ConfigName(ConfigurationConstants.GetHomePopup)]
    public class GetHomePopup
    {
        [CouplingPropertyName(common.TitleId)]
        [BsonElement("titleId")]
        public string TitleId { get; set; }

        [CouplingPropertyName(common.TextId)]
        [BsonElement("textId")]
        public string TextId { get; set; }

        [CouplingPropertyName(person.Email)]
        [BsonElement("email")]
        public string Email { get; set; }
    }
}
