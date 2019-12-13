using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;

namespace AnimalRescue.DataAccess.Mongodb.Models
{
	[BsonDiscriminator("blogs")]
	public class Blog : BaseItem
	{
		[BsonElement("body")]
		public string Body { get; set; }

		[BsonElement("description")]
		public string Description { get; set; }

		[BsonElement("imagesIds")]
		public IList<string> ImagesIds { get; set; }
	}
}
