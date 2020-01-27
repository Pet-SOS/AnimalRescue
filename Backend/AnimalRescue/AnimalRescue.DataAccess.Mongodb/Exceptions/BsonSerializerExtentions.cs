using MongoDB.Bson;
using MongoDB.Bson.Serialization;

namespace AnimalRescue.DataAccess.Mongodb.Exceptions
{
    public static class BsonSerializerExtentions
    {
        public static T Deserialize<T>(this BsonDocument data)
        {
            return data == null 
                ? default(T) 
                : BsonSerializer.Deserialize<T>(data);  
        }
    }
}
