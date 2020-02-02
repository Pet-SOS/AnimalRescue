using AnimalRescue.DataAccess.Mongodb.Attributes;
using AnimalRescue.DataAccess.Mongodb.Models.BaseItems;

using MongoDB.Bson.Serialization.Attributes;

using System.Collections.Generic;

using common = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Common;

namespace AnimalRescue.DataAccess.Mongodb.Models
{
    [BsonDiscriminator("document_collections")]
	public class DocumentCollection : BaseAndTimeItem
	{
        [CouplingPropertyName(common.ImageIds)]
        [BsonElement("typeNameToDocumentId")]
        public Dictionary<string, string> TypeNameToDocumentId { get; set; }
    }
}
