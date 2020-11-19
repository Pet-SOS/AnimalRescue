using AnimalRescue.DataAccess.Mongodb.Attributes;
using AnimalRescue.DataAccess.Mongodb.Models.BaseItems;
using MongoDB.Bson.Serialization.Attributes;

namespace TelegramMessenger.Models
{
    [BsonDiscriminator("chat")]
    public class Chat : BaseAndTimeItem
    {
        [BsonElement("chatId")]
        [CouplingPropertyName("chatId")]
        public long ChatId { get; set; }
    }
}
