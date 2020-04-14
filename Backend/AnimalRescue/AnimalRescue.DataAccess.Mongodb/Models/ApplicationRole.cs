using AnimalRescue.DataAccess.Mongodb.Attributes;
using AnimalRescue.DataAccess.Mongodb.Models.BaseItems;
using AnimalRescue.Infrastructure.Helpers;

using AspNetCore.Identity.MongoDbCore.Models;

using MongoDB.Bson.Serialization.Attributes;

using MongoDbGenericRepository.Attributes;

using System;

using baseItem = AnimalRescue.Contracts.Common.Constants.PropertyConstants.BaseItem;

namespace AnimalRescue.DataAccess.Mongodb.Models
{
    [CollectionName("userRoles")]
    [BsonDiscriminator("userRoles")]
    public class ApplicationRole : MongoIdentityRole<string>, IBaseAuditItem, IApplicationExceptionFilterItem
    {
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
        #endregion

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
