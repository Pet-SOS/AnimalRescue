using AnimalRescue.DataAccess.Mongodb.Attributes;
using AnimalRescue.DataAccess.Mongodb.Models.BaseItems;

using MongoDB.Bson.Serialization.Attributes;

using System.Collections.Generic;

using common = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Common;

namespace AnimalRescue.DataAccess.Mongodb.Models.Configurations.Nested.Info
{
    public class BaseInfo
    {
        [CouplingPropertyName(common.Title)]
        [BsonElement("title")]
        public List<LanguageValue> Title { get; set; }

        [CouplingPropertyName(common.Paragraphs)]
        [BsonElement("paragraphs")]
        public List<Paragraph> Paragraphs { get; set; }
    }
}
