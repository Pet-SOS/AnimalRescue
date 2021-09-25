using AnimalRescue.DataAccess.Mongodb.Attributes;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;
using common = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Common;

namespace AnimalRescue.DataAccess.Mongodb.Models.Configurations.Nested.Info
{
    public class BaseInfo
    {
        [CouplingPropertyName(common.Paragraphs)]
        [BsonElement("paragraphs")]
        public List<Paragraph> Paragraphs { get; set; }
    }
}
