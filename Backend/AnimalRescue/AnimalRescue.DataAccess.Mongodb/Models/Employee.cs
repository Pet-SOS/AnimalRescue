using AnimalRescue.DataAccess.Mongodb.Attributes;
using AnimalRescue.DataAccess.Mongodb.Models.BaseItems;
using MongoDB.Bson.Serialization.Attributes;

using common = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Common;

namespace AnimalRescue.DataAccess.Mongodb.Models
{
    [BsonDiscriminator("employee")]
	public class Employee : BaseAndTimeItem
	{
        [CouplingPropertyName(common.Name)]
        [BsonElement("name")]
        public string Name { get; set; }

		[CouplingPropertyName(common.Description)]
		[BsonElement("description")]
		public string Description { get; set; }
    }
}
