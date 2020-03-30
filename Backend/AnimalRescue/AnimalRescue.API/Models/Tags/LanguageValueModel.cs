using AnimalRescue.Contracts.Common.Constants;

using Newtonsoft.Json;

using System.Text.Json.Serialization;

namespace AnimalRescue.API.Models.Tags
{
    public class LanguageValueModel
    {
        [JsonPropertyName(PropertyConstants.Common.Lang)]
        [JsonProperty(PropertyConstants.Common.Lang)]
        public string Lang { get; set; }

        [JsonPropertyName(PropertyConstants.Common.Value)]
        [JsonProperty(PropertyConstants.Common.Value)]
        public string Value { get; set; }
    }
}
