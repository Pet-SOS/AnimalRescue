using System;
using AnimalRescue.Contracts.Common.Constants;
using AnimalRescue.DataAccess.Mongodb.Attributes;
using AnimalRescue.DataAccess.Mongodb.Models.BaseItems;

using MongoDB.Bson.Serialization.Attributes;

namespace AnimalRescue.DataAccess.Mongodb.Models
{
    [BsonDiscriminator("financial_reports")]
    public class FinancialReport : BaseAndTimeItem
    {
        [CouplingPropertyName(PropertyConstants.Common.Title)]
        [BsonElement("title")]
        public string Title { get; set; }

        [CouplingPropertyName(PropertyConstants.Common.Body)]
        [BsonElement("body")]
        public string Body { get; set; }

        [CouplingPropertyName(PropertyConstants.FinancialReport.FileId)]
        [BsonElement("fileLink")]
        public string FileId { get; set; }

        [CouplingPropertyName(PropertyConstants.FinancialReport.Date)]
        [BsonElement("date")]
        public DateTime Date { get; set; }
    }
}
