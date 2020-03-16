using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace AnimalRescue.DataAccess.Mongodb.Models.BaseItems
{
    [BsonIgnoreExtraElements]
    public class BaseItem: IBaseItem
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
    }
}
