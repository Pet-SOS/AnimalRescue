using System;
using AnimalRescue.DataAccess.Mongodb.Models.BaseItems;
using MongoDB.Bson.Serialization.Attributes;

namespace AnimalRescue.DataAccess.Mongodb.Models
{
    [BsonDiscriminator("refreshTokens")]
    public class RefreshToken : BaseAndTimeItem
    {
        [BsonElement("token")]
        public string Token { get; set; }

        [BsonElement("jwtId")]
        public string JwtId { get; set; }

        [BsonElement("expiredAt")]
        public DateTime ExpiredAt { get; set; }

        [BsonElement("isRememberTokenLongerTime")]
        public bool IsRememberTokenLongerTime { get; set; }

        [BsonElement("userId")]
        public string UserId { get; set; }
    }
}
