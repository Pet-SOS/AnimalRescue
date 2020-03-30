using System.Text.Json.Serialization;
using AnimalRescue.Contracts.Common.Constants;
using Newtonsoft.Json;

namespace AnimalRescue.API.Models.Tags
{
    public class LanguageValue
    {
        [JsonPropertyName(PropertyConstants.Common.Lang)]
        [JsonProperty(PropertyConstants.Common.Lang)]
        public string Lang { get; set; }

        [JsonPropertyName(PropertyConstants.Common.Value)]
        [JsonProperty(PropertyConstants.Common.Value)]
        public string Value { get; set; }
    }
}
