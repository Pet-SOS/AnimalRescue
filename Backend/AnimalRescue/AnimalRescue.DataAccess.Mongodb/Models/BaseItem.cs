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

		[BsonElement("created")]
		public DateTimeOffset Created { get; set; }

		[BsonElement("lastModified")]
		public DateTimeOffset? LastModified { get; set; }

		[BsonElement("createdBy")]
		public string CreatedBy { get; set; }

		[BsonElement("modifiedBy")]
		public string ModifiedBy { get; set; }
	}
}
