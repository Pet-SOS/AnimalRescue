using AnimalRescue.DataAccess.Mongodb.Attributes;

using MongoDB.Bson.Serialization.Attributes;

using System;
using System.Collections.Generic;

using common = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Common;

namespace AnimalRescue.DataAccess.Mongodb.Models
{
    [BsonDiscriminator("stories")]
    public class Story : BaseItem
    {
        [CouplingPropertyName(common.Title)]
        [BsonElement("title")]
        public string Title { get; set; }

        [CouplingPropertyName(common.Body)]
        [BsonElement("body")]
        public string Body { get; set; }

        [CouplingPropertyName(common.ImageIds)]
        [BsonElement("imageLinks")]
        public List<string> ImageLinks { get; set; }
    }
}
