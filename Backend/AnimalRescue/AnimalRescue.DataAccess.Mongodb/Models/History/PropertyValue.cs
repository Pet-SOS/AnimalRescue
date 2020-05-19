using AnimalRescue.DataAccess.Mongodb.Attributes;
using MongoDB.Bson.Serialization.Attributes;

using history = AnimalRescue.Contracts.Common.Constants.PropertyConstants.History;

namespace AnimalRescue.DataAccess.Mongodb.Models.History
{
    public class PropertyValue
    {
        [CouplingPropertyName(history.PropertyName)]
        [BsonElement("propertyName")]
        public string PropertyName { get; set; }

        [CouplingPropertyName(history.LastValue)]
        [BsonElement("lastValue")]
        public string LastValue { get; set; }

        [CouplingPropertyName(history.NewValue)]
        [BsonElement("newValue")]
        public string NewValue { get; set; }
    }
}
