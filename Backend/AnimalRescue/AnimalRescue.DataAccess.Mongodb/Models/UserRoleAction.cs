using AnimalRescue.DataAccess.Mongodb.Attributes;
using AnimalRescue.DataAccess.Mongodb.Models.BaseItems;
using MongoDB.Bson.Serialization.Attributes;
using common = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Common;

namespace AnimalRescue.DataAccess.Mongodb.Models
{
    [BsonDiscriminator("user_role_action_tagIds")]
    public class UserRoleAction : BaseAndTimeItem
    {
        [CouplingPropertyName(common.UserRole)]
        [BsonElement("userRole")]
        public string UserRole { get; set; }

        [CouplingPropertyName(common.Action)]
        [BsonElement("action")]
        public string Action { get; set; }

        [CouplingPropertyName(common.TagId)]
        [BsonElement("tagId")]
        public string TagId { get; set; }

        [CouplingPropertyName(common.IsMessageSent)]
        [BsonElement("isMessageSent")]
        public bool IsMessageSent { get; set; }

        [CouplingPropertyName(common.ChatName)]
        [BsonElement("chatName")]
        public string ChatName { get; set; }
    }
}
