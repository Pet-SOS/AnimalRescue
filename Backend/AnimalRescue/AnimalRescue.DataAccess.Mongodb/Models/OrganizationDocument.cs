using AnimalRescue.Contracts.Common.Constants;
using AnimalRescue.DataAccess.Mongodb.Attributes;
using MongoDB.Bson.Serialization.Attributes;
using System;

namespace AnimalRescue.DataAccess.Mongodb.Models
{
    [BsonDiscriminator("organization_documents")]
    public class OrganizationDocument: BaseItems.BaseAndTimeItem
    {
        [CouplingPropertyName(PropertyConstants.Common.Name)]
        [BsonElement("name")]
        public string Name { get; set; }

        [BsonElement("bucketId")]
        public string BucketId { get; set; }

        public OrganizationDocument()
        {

        }
    }
}
