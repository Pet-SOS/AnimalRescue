using AnimalRescue.DataAccess.Mongodb.Attributes;
using AnimalRescue.DataAccess.Mongodb.Models.BaseItems;

using MongoDB.Bson.Serialization.Attributes;

using System.Collections.Generic;

using animal = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Animal;
using common = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Common;

namespace AnimalRescue.DataAccess.Mongodb.Models.Tag
{
    [BsonDiscriminator("well_known_tags")]
    public class WellKnownTag : 
        TagBase,
        IDeletableItem,
        IBaseAuditItem
    {
        [CouplingPropertyName(common.Category)]
        [BsonElement("category")]
        public string Category { get; set; }

        [CouplingPropertyName(animal.KindOfAnimal)]
        [BsonElement("kindOfAnimal")]
        public string KindOfAnimal { get; set; }

        [CouplingPropertyName(common.Code)]
        [BsonElement("code")]
        public string Code { get; set; }

        [CouplingPropertyName(common.Values)]
        [BsonElement("values")]
        public List<LanguageValue> Values { get; set; }
    }
}
