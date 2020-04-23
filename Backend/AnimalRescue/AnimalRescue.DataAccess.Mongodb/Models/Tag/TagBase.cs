using AnimalRescue.DataAccess.Mongodb.Attributes;

using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

using System;

using baseItem = AnimalRescue.Contracts.Common.Constants.PropertyConstants.BaseItem;

namespace AnimalRescue.DataAccess.Mongodb.Models.Tag
{
    [BsonIgnoreExtraElements]
    public class TagBase
    {
        #region IBaseAuditItem
        [BsonId]
        //[BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        [CouplingPropertyName(baseItem.CreatedAt)]
        [BsonElement("createdAt")]
        public DateTime CreatedAt { get; set; }

        [CouplingPropertyName(baseItem.ModifiedAt)]
        [BsonElement("modifiedAt")]
        public DateTime? ModifiedAt { get; set; }

        [CouplingPropertyName(baseItem.CreatedBy)]
        [BsonElement("createdBy")]
        public string CreatedBy { get; set; }

        [CouplingPropertyName(baseItem.ModifiedBy)]
        [BsonElement("modifiedBy")]
        public string ModifiedBy { get; set; }

        [CouplingPropertyName(baseItem.IsDeleted)]
        [BsonElement("isDeleted")]
        public bool IsDeleted { get; set; }

        [CouplingPropertyName(baseItem.IsDeletable)]
        [BsonElement("isDeletable")]
        public bool IsDeletable { get; set; }

        #endregion
    }
}
