using AnimalRescue.DataAccess.Mongodb.Attributes;
using AnimalRescue.DataAccess.Mongodb.Models.BaseItems;
using MongoDB.Bson.Serialization.Attributes;

using chat = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Chat;

namespace AnimalRescue.DataAccess.Mongodb.Models
{
    [BsonDiscriminator("chat")]
    public class Chat : BaseAndTimeItem
    {
        [BsonElement("chatId")]
        [CouplingPropertyName(chat.ChatId)]
        public long ChatId { get; set; }
    }
}
