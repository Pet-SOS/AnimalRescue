using Newtonsoft.Json;
using System.Text.Json.Serialization;
using common = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Common;

namespace AnimalRescue.API.Models.Configurations.Donations
{
    public class DonationConfigurationModel
    {
        [JsonPropertyName(common.Body)]
        [JsonProperty(common.Body)]
        public string Body { get; set; }
    }
}
