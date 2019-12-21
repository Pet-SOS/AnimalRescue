using AnimalRescue.DataAccess.Mongodb.Attributes;

using MongoDB.Bson.Serialization.Attributes;

using System.Collections.Generic;

using common = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Common;

namespace AnimalRescue.DataAccess.Mongodb.Models
{
    [BsonDiscriminator("blogs")]
	public class Blog : BaseItem
	{
        [CouplingPropertyName(common.Body)]
		[BsonElement("body")]
		public string Body { get; set; }

        [CouplingPropertyName(common.Description)]
		[BsonElement("description")]
		public string Description { get; set; }

        [CouplingPropertyName(common.ImageIds)]
		[BsonElement("imagesIds")]
		public IList<string> ImagesIds { get; set; }
	}
}
