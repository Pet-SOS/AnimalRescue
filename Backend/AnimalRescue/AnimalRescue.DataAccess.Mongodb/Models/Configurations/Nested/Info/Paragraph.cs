using AnimalRescue.DataAccess.Mongodb.Attributes;
using AnimalRescue.DataAccess.Mongodb.Models.BaseItems;

using MongoDB.Bson.Serialization.Attributes;

using System.Collections.Generic;

using common = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Common;

namespace AnimalRescue.DataAccess.Mongodb.Models.Configurations.Nested.Info
{
    public class Paragraph
    {
        [CouplingPropertyName(common.Number)]
        [BsonElement("number")]
        public int Number { get; set; }

        [CouplingPropertyName(common.Name)]
        [BsonElement("name")]
        public string Name { get; set; }
        
        [CouplingPropertyName(common.Values)]
        [BsonElement("values")]
        public List<LanguageValue> Values { get; set; }
    }
}
