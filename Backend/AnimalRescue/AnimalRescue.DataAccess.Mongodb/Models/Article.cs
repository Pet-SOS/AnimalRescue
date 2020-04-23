using AnimalRescue.DataAccess.Mongodb.Attributes;
using AnimalRescue.DataAccess.Mongodb.Models.BaseItems;
using MongoDB.Bson.Serialization.Attributes;

using System.Collections.Generic;

using common = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Common;

namespace AnimalRescue.DataAccess.Mongodb.Models
{
    [BsonDiscriminator("article")]
    public class Article : BaseAndTimeItem, IImageIds
    {
        [CouplingPropertyName(common.Title)]
        [BsonElement("title")]
        public string Title { get; set; }

        [CouplingPropertyName(common.Body)]
        [BsonElement("body")]
        public string Body { get; set; }

        [CouplingPropertyName(common.Type)]
        [BsonElement("type")]
        public string Type { get; set; }

        [CouplingPropertyName(common.IsRescued)]
        [BsonElement("isRescued")]
        public bool IsRescued { get; set; }

        [CouplingPropertyName(common.ImageIds)]
        [BsonElement("imageIds")]
        public List<string> ImageIds { get; set; } = new List<string>();

        [CouplingPropertyName(common.Tags)]
        [BsonElement("tags")]
        public List<string> Tags { get; set; }
    }
}
