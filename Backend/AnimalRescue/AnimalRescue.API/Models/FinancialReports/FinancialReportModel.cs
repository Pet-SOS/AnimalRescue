using AnimalRescue.Contracts.Common.Constants;

using Newtonsoft.Json;

using System;
using System.Text.Json.Serialization;

namespace AnimalRescue.API.Models.FinancialReports
{
    public class FinancialReportModel : BaseAndTimeModel<Guid>
    {
        [JsonPropertyName(PropertyConstants.Common.Title)]
        [JsonProperty(PropertyConstants.Common.Title)]
        public string Title { get; set; }

        [JsonPropertyName(PropertyConstants.Common.Body)]
        [JsonProperty(PropertyConstants.Common.Body)]
        public string Body { get; set; }

        [JsonPropertyName(PropertyConstants.FinancialReport.FileId)]
        [JsonProperty(PropertyConstants.FinancialReport.FileId)]
        public Guid FileId { get; set; }

        [JsonPropertyName(PropertyConstants.FinancialReport.Date)]
        [JsonProperty(PropertyConstants.FinancialReport.Date)]
        public DateTime Date { get; set; }
    }
}
