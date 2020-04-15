using AnimalRescue.DataAccess.Mongodb.Attributes;
using AnimalRescue.DataAccess.Mongodb.Models.BaseItems;
using AnimalRescue.Infrastructure.Helpers;

using AspNetCore.Identity.MongoDbCore.Models;

using MongoDB.Bson.Serialization.Attributes;

using MongoDbGenericRepository.Attributes;

using System;

using baseItem = AnimalRescue.Contracts.Common.Constants.PropertyConstants.BaseItem;
using person = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Person;

namespace AnimalRescue.DataAccess.Mongodb.Models
{
    [CollectionName("users")]
    [BsonDiscriminator("users")]
    public class ApplicationUser : MongoIdentityUser<string>, IBaseAuditItem, IApplicationExceptionFilterItem
    {
        [CouplingPropertyName(person.FirstName)]
        //[BsonElement("firstName")]
        public string FirstName { get; set; }

        [CouplingPropertyName(person.LastName)]
        //[BsonElement("lastName")]
        public string LastName { get; set; }

        [CouplingPropertyName(person.ProfilePhoto)]
        //[BsonElement("profilePhoto")]
        public string ProfilePhoto { get; set; }

        [CouplingPropertyName(person.Birthday)]
        //[BsonElement("birthday")]
        public DateTime? Birthday { get; set; }

        [CouplingPropertyName(person.LastPasswordChange)]
        //[BsonElement("lastPasswordChange")]
        public DateTime? LastPasswordChange { get; set; }

        #region IBaseAuditItem
        [CouplingPropertyName(baseItem.CreatedAt)]
        //[BsonElement("createdAt")]
        public DateTime CreatedAt { get; set; }

        [CouplingPropertyName(baseItem.ModifiedAt)]
        //[BsonElement("modifiedAt")]
        public DateTime? ModifiedAt { get; set; }

        [CouplingPropertyName(baseItem.CreatedBy)]
        //[BsonElement("createdBy")]
        public string CreatedBy { get; set; }

        [CouplingPropertyName(baseItem.ModifiedBy)]
        //[BsonElement("modifiedBy")]
        public string ModifiedBy { get; set; }

        [CouplingPropertyName(baseItem.IsDeleted)]
        //[BsonElement("isDeleted")]
        public bool IsDeleted { get; set; }

        [CouplingPropertyName(baseItem.IsDeletable)]
        //[BsonElement("isDeletable")]
        public bool IsDeletable { get; set; }
        #endregion

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
