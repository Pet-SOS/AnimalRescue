using AnimalRescue.DataAccess.Mongodb.Attributes;
using MongoDB.Bson.Serialization.Attributes;


using common = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Common;

namespace AnimalRescue.DataAccess.Mongodb.Models
{
    [BsonDiscriminator("tags")]
    public class Tags : BaseItem
    {
        [CouplingPropertyName(common.Type)]
        [BsonElement("type")]
        public string Type { get; set; }

        [CouplingPropertyName(common.Title)]
        [BsonElement("title")]
        public string Title { get; set; }
    }
}
