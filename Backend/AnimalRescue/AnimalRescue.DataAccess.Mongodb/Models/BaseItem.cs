using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;

namespace AnimalRescue.DataAccess.Mongodb.Models
{
    [BsonIgnoreExtraElements]
    public class BaseItem
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

		[BsonElement("createdAt")]
		public DateTimeOffset CreatedAt { get; set; }

		[BsonElement("modifiedAt")]
		public DateTimeOffset? ModifiedAt { get; set; }

		[BsonElement("createdBy")]
		public string CreatedBy { get; set; }

		[BsonElement("modifiedBy")]
		public string ModifiedBy { get; set; }
	}
}
