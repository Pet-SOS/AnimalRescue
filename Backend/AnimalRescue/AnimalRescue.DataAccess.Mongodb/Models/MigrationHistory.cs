using AnimalRescue.Contracts.Common.Constants;
using AnimalRescue.DataAccess.Mongodb.Attributes;
using AnimalRescue.DataAccess.Mongodb.Models.BaseItems;
using MongoDB.Bson.Serialization.Attributes;

namespace AnimalRescue.DataAccess.Mongodb.Models
{
    [BsonDiscriminator("__migration_history")]
    public class MigrationHistory : BaseAndTimeItem
    {
        [CouplingPropertyName(PropertyConstants.Migration.MigrationId)]
        [BsonElement("migrationId")]
        public string MigrationId { get; set; }
    }
}