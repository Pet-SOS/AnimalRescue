using AnimalRescue.DataAccess.Mongodb.Models.BaseItems;
using AnimalRescue.Infrastructure.Helpers;
using AspNetCore.Identity.Mongo.Model;
using MongoDB.Bson.Serialization.Attributes;
using System;

namespace AnimalRescue.DataAccess.Mongodb.Models
{
    [BsonDiscriminator("users")]
    public class ApplicationUser: MongoUser, IBaseAuditItem
    {
        [BsonElement("firstName")]
        public string FirstName { get; set; }

        [BsonElement("lastName")]
        public string LastName { get; set; }

        [BsonElement("profilePhoto")]
        public string ProfilePhoto { get; set; }


        [BsonElement("birthday")]
        public string Birthday { get; set; }

        [BsonElement("createdAt")]
        public DateTime CreatedAt { get; set; }

        [BsonElement("modifiedAt")]
        public DateTime? ModifiedAt { get; set; }

        [BsonElement("createdBy")]
        public string CreatedBy { get; set; }

        [BsonElement("modifiedBy")]
        public string ModifiedBy { get; set; }

        public ApplicationUser()
        {

            CreatedAt = DateHelper.GetUtc();
        }
    }
}
