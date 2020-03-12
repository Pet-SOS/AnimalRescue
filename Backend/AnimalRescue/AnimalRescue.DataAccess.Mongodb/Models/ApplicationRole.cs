using AnimalRescue.DataAccess.Mongodb.Models.BaseItems;
using AnimalRescue.Infrastructure.Helpers;
using AspNetCore.Identity.Mongo.Model;
using MongoDB.Bson.Serialization.Attributes;
using System;

namespace AnimalRescue.DataAccess.Mongodb.Models
{
    [BsonDiscriminator("roles")]
    public class ApplicationRole : MongoRole, IBaseAuditItem
    {
        [BsonElement("createdAt")]
        public DateTime CreatedAt { get; set; }

        [BsonElement("modifiedAt")]
        public DateTime? ModifiedAt { get; set; }

        [BsonElement("createdBy")]
        public string CreatedBy { get; set; }

        [BsonElement("modifiedBy")]
        public string ModifiedBy { get; set; }

        [BsonElement("isDeleted")]
        public bool IsDeleted { get; set; }

        public ApplicationRole() : base()
        {

            CreatedAt = DateHelper.GetUtc();
        }

        public ApplicationRole(string role)
            : base(role)
        {

            CreatedAt = DateHelper.GetUtc();
        }

        
    }
}
