using AnimalRescue.DataAccess.Mongodb.Attributes;

using MongoDB.Bson.Serialization.Attributes;

using common = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Common;

namespace AnimalRescue.DataAccess.Mongodb.Models.BaseItems
{
    public class LanguageValue
    {
        [CouplingPropertyName(common.Lang)]
        [BsonElement("lang")]
        public string Lang { get; set; }

        [CouplingPropertyName(common.Value)]
        [BsonElement("value")]
        public string Value { get; set; }
    }
}
