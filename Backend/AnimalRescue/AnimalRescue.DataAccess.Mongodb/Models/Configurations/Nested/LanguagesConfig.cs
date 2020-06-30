using AnimalRescue.Contracts.Common.Constants;
using AnimalRescue.DataAccess.Mongodb.Attributes;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;
using common = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Common;

namespace AnimalRescue.DataAccess.Mongodb.Models.Configurations.Nested
{
    [ConfigName(ConfigurationConstants.Language)]
    public class LanguagesConfig
    {
        [CouplingPropertyName(common.Languages)]
        [BsonElement("languages")]
        public Dictionary<string, bool> Languages { get; set; }
    }
}
