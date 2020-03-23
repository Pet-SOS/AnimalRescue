using MongoDB.Bson;

using System;
using System.Linq;

namespace AnimalRescue.DataAccess.Mongodb.Extensions
{
    public static class ObjectIdExtensions
    {
        public static ObjectId AsObjectId(this Guid gid)
        {
            var bytes = gid
                .ToByteArray()
                .Take(12)
                .ToArray();

            var oid = new ObjectId(bytes);
            return oid;
        }
        public static string AsObjectIdString(this Guid gid)
        {
            return AsObjectId(gid)
                .ToString();
        }
        public static Guid AsGuid(this ObjectId oid)
        {
            var bytes = oid
                .ToByteArray()
                .Concat(new byte[] { 5, 5, 5, 5 })
                .ToArray();

            Guid gid = new Guid(bytes);
            return gid;
        }
        public static Guid AsGuid(this string oid)
        {
            var bytes = ObjectId
                .Parse(oid)
                .ToByteArray()
                .Concat(new byte[] { 5, 5, 5, 5 })
                .ToArray();

            Guid gid = new Guid(bytes);
            return gid;
        }
    }
}
