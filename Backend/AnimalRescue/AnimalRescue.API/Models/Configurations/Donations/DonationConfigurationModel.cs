using Newtonsoft.Json;

using System.Text.Json.Serialization;

using cms = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Cms;
using common = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Common;

namespace AnimalRescue.API.Models.Configurations.Donations
{
    public class DonationConfigurationModel
    {
        [JsonPropertyName(cms.BankCard)]
        [JsonProperty(cms.BankCard)]
        public BankCardModel BankCard { get; set; }

        [JsonPropertyName(common.Title)]
        [JsonProperty(common.Title)]
        public string Title { get; set; }

        [JsonPropertyName(common.Body)]
        [JsonProperty(common.Body)]
        public string Body { get; set; }
    }
}
