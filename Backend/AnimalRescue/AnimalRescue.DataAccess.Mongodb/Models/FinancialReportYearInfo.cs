using AnimalRescue.Contracts.Common.Constants;
using AnimalRescue.DataAccess.Mongodb.Attributes;
using AnimalRescue.DataAccess.Mongodb.Models.BaseItems;
using AnimalRescue.DataAccess.Mongodb.Models.Configurations.Nested.Info;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;

using common = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Common;

namespace AnimalRescue.DataAccess.Mongodb.Models
{
    [BsonDiscriminator("financial_report_year_infos")]
    public class FinancialReportYearInfo : BaseAndTimeItem
    {
        [CouplingPropertyName(PropertyConstants.FinancialReportYearInfo.Year)]
        [BsonElement(PropertyConstants.FinancialReportYearInfo.Year)]
        public int Year { get; set; }

        [CouplingPropertyName(common.Paragraphs)]
        [BsonElement(common.Paragraphs)]
        public List<Paragraph> Paragraphs { get; set; }
    }
}
