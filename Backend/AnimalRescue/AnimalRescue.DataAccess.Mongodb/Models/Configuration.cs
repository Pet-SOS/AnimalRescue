using MongoDB.Bson.Serialization.Attributes;

namespace AnimalRescue.DataAccess.Mongodb.Models
{
    public class Configuration<T> : BaseItem
    {
        [BsonElement("name")]
        public string Name { get; set; }

        [BsonElement("data")]
        public T Data { get; set; }
    }
}
