using System.Text.Json.Serialization;
using AnimalRescue.Contracts.Common.Constants;
using Newtonsoft.Json;

namespace AnimalRescue.API.Models.FinancialReports
{
    public class FinancialReportUpdateModel: FinancialReportCreateModel
    {
        [JsonPropertyName(PropertyConstants.BaseItem.Id)]
        [JsonProperty(PropertyConstants.BaseItem.Id)]
        public string Id { get; set; }
    }
}
