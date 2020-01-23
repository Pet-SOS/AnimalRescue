using System.Text.Json.Serialization;
using AnimalRescue.Contracts.Common.Constants;
using Newtonsoft.Json;

namespace AnimalRescue.API.Models.Tags
{
    public class TagCreateUpdateModel
    {
        [JsonPropertyName(PropertyConstants.Common.Type)]
        [JsonProperty(PropertyConstants.Common.Type)]
        public string Type { get; set; }

        [JsonPropertyName(PropertyConstants.Common.Title)]
        [JsonProperty(PropertyConstants.Common.Title)]
        public string Title { get; set; }
    }
}
