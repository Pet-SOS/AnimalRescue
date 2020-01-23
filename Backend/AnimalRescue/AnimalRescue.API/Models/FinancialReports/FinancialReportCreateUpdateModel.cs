using AnimalRescue.Contracts.Common.Constants;
using Newtonsoft.Json;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Http;

namespace AnimalRescue.API.Models.FinancialReports
{
    public class FinancialReportCreateUpdateModel
    {
        [JsonPropertyName(PropertyConstants.Common.Title)]
        [JsonProperty(PropertyConstants.Common.Title)]
        public string Title { get; set; }

        [JsonPropertyName(PropertyConstants.Common.Body)]
        [JsonProperty(PropertyConstants.Common.Body)]
        public string Body { get; set; }

        [JsonPropertyName(PropertyConstants.FinancialReport.File)]
        [JsonProperty(PropertyConstants.FinancialReport.File)]
        public IFormFile File { get; set; }
    }
}
