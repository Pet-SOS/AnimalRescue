using AnimalRescue.DataAccess.Mongodb.Attributes;
using AnimalRescue.DataAccess.Mongodb.Models.BaseItems;

using MongoDB.Bson.Serialization.Attributes;

using System.Collections.Generic;

using common = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Common;

namespace AnimalRescue.DataAccess.Mongodb.Models.Tag
{
    [BsonDiscriminator("tags_large")]
    public class TagLarge : 
        TagBase,
        IDeletableItem,
        IBaseAuditItem
    {
        [CouplingPropertyName(common.Category)]
        [BsonElement("category")]
        public string Category { get; set; }

        [CouplingPropertyName(common.Code)]
        [BsonElement("code")]
        public string Code { get; set; }

        [CouplingPropertyName(common.Values)]
        [BsonElement("values")]
        public List<LanguageValue> Values { get; set; }
    }
}
