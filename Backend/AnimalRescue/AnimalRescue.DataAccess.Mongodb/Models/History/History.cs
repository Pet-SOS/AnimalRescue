using System.Collections.Generic;
using AnimalRescue.DataAccess.Mongodb.Attributes;
using AnimalRescue.DataAccess.Mongodb.Models.BaseItems;
using MongoDB.Bson.Serialization.Attributes;

using history = AnimalRescue.Contracts.Common.Constants.PropertyConstants.History;

namespace AnimalRescue.DataAccess.Mongodb.Models.History
{
    [BsonDiscriminator("history")]
    public class History : BaseAndTimeItem
    {
        [CouplingPropertyName(history.EntityName)]
        [BsonElement("entityName")]
        public string EntityName { get; set; }

        [CouplingPropertyName(history.EntityId)]
        [BsonElement("entityId")]
        public string EntityId { get; set; }

        [CouplingPropertyName(history.IsEntityDeleted)]
        [BsonElement("isEntityDeleted")]
        public bool IsEntityDeleted { get; set; }

        [CouplingPropertyName(history.Differences)]
        [BsonElement("differences")]
        public ICollection<DifferenceValue> Differences { get; set; }
    }
}
