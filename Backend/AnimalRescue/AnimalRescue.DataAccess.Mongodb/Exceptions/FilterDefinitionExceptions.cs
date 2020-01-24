using MongoDB.Bson;
using MongoDB.Driver;

namespace AnimalRescue.DataAccess.Mongodb.Exceptions
{
    public static class FilterDefinitionExceptions
    {
        public static FilterDefinition<BsonDocument> EQ(this string propertyName, string value)
        {
            return EQ<BsonDocument, string>(propertyName, value);
        }
        public static FilterDefinition<TOut> EQ<TOut, TValue>(this string propertyName, TValue value)
        {
            return Builders<TOut>.Filter.Eq(propertyName, value);
        }
        public static FilterDefinition<T> OR<T>(this FilterDefinition<T>[] filters)
        {
            return Builders<T>.Filter.Or(filters);
        }
        public static FilterDefinition<BsonDocument> OR(this FilterDefinition<BsonDocument>[] filters)
        {
            return OR<BsonDocument>(filters);
        }
        public static FilterDefinition<T> AND<T>(params FilterDefinition<T>[] filters)
        {
            return Builders<T>.Filter.And(filters);
        }
        public static FilterDefinition<BsonDocument> AND(params FilterDefinition<BsonDocument>[] filters)
        {
            return AND<BsonDocument>(filters);
        }
    }
}
