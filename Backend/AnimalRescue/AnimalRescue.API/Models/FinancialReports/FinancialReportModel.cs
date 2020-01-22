using AnimalRescue.Contracts.Common.Constants;
using Newtonsoft.Json;
using System.Text.Json.Serialization;

namespace AnimalRescue.API.Models.FinancialReports
{
    public class FinancialReportModel : BaseAndTimeModel
    {
        [JsonPropertyName(PropertyConstants.Common.Title)]
        [JsonProperty(PropertyConstants.Common.Title)]
        public string Title { get; set; }

        [JsonPropertyName(PropertyConstants.Common.Body)]
        [JsonProperty(PropertyConstants.Common.Body)]
        public string Body { get; set; }

        [JsonPropertyName(PropertyConstants.FinancialReport.FileId)]
        [JsonProperty(PropertyConstants.FinancialReport.FileId)]
        public string FileId { get; set; }
    }
}
