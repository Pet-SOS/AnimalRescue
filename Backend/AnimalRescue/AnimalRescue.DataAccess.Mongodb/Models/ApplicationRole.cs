using AnimalRescue.DataAccess.Mongodb.Models.BaseItems;
using AnimalRescue.Infrastructure.Helpers;
using AspNetCore.Identity.MongoDbCore.Models;
using MongoDB.Bson.Serialization.Attributes;
using MongoDbGenericRepository.Attributes;
using System;

namespace AnimalRescue.DataAccess.Mongodb.Models
{
    [CollectionName("userRoles")]
    [BsonDiscriminator("userRoles")]
    public class ApplicationRole : MongoIdentityRole<string>, IBaseAuditItem
    {
        public DateTime CreatedAt { get; set; }
        public DateTime? ModifiedAt { get; set; }
        public string CreatedBy { get; set; }
        public string ModifiedBy { get; set; }

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
