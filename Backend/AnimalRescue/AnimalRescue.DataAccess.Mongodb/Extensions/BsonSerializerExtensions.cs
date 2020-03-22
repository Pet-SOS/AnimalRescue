using MongoDB.Bson;
using MongoDB.Bson.Serialization;

namespace AnimalRescue.DataAccess.Mongodb.Extensions
{
    public static class BsonSerializerExtensions
    {
        public static T Deserialize<T>(this BsonDocument data)
        {
            return data == null 
                ? default(T) 
                : BsonSerializer.Deserialize<T>(data);  
        }
    }
}
