using AnimalRescue.DataAccess.Mongodb.Models.BaseItems;
using AnimalRescue.Infrastructure.Helpers;
using AspNetCore.Identity.MongoDbCore.Models;
using MongoDB.Bson.Serialization.Attributes;
using MongoDbGenericRepository.Attributes;
using System;

namespace AnimalRescue.DataAccess.Mongodb.Models
{
    [CollectionName("users")]
    [BsonDiscriminator("users")]
    public class ApplicationUser : MongoIdentityUser<string>, IBaseAuditItem
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string ProfilePhoto { get; set; }

        public DateTime? Birthday { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime? ModifiedAt { get; set; }

        public string CreatedBy { get; set; }

        public string ModifiedBy { get; set; }

        public bool IsDeleted { get; set; }

        public DateTime? LastPasswordChange { get; set; }

        public ApplicationUser() : base()
        {

            CreatedAt = DateHelper.GetUtc();
        }

        public ApplicationUser(string userName, string email) : base(userName, email)
        {
            CreatedAt = DateHelper.GetUtc();
        }
    }
}
