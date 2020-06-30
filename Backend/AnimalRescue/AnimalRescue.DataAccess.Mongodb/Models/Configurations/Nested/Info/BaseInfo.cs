using AnimalRescue.Contracts.Common.Constants;
using AnimalRescue.DataAccess.Mongodb.Attributes;
using AnimalRescue.DataAccess.Mongodb.Models.Tag;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;

using common = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Common;

namespace AnimalRescue.DataAccess.Mongodb.Models.Configurations.Nested.Info
{
    [ConfigName(ConfigurationConstants.CmsConfigurationName)]
    public class BaseInfo
    {
        [CouplingPropertyName(common.Title)]
        [BsonElement("title")]
        public TagLarge Title { get; set; }

        [CouplingPropertyName(common.Paragraphs)]
        [BsonElement("paragraphs")]
        public List<TagLarge> Paragraphs { get; set; }
    }
}
