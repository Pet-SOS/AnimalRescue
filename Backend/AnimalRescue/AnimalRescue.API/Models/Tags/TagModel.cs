using AnimalRescue.Contracts.Common.Constants;

using Newtonsoft.Json;

using System;
using System.Text.Json.Serialization;

namespace AnimalRescue.API.Models.Tags
{
    public class TagModel : BaseAndTimeModel<Guid>
    {
        [JsonPropertyName(PropertyConstants.Common.Type)]
        [JsonProperty(PropertyConstants.Common.Type)]
        public string Type { get; set; }

        [JsonPropertyName(PropertyConstants.Common.Title)]
        [JsonProperty(PropertyConstants.Common.Title)]
        public string Title { get; set; }
    }
}
