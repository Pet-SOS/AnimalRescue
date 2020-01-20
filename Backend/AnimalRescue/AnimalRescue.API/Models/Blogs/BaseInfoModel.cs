using Newtonsoft.Json;

using System.Collections.Generic;
using System.Text.Json.Serialization;

using common = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Common;

namespace AnimalRescue.API.Models.Blogs
{
    public class BaseInfoModel : BaseAndTimeModel
    {
        [JsonPropertyName(common.Title)]
        [JsonProperty(common.Title)]
        public string Title { get; set; }

        [JsonPropertyName(common.Body)]
        [JsonProperty(common.Body)]
        public string Body { get; set; }

        [JsonProperty(common.ImageIds)]
        public List<string> ImageIds { get; set; } = new List<string>();

        [JsonPropertyName(common.Tags)]
        [JsonProperty(common.Tags)]
        public List<string> Tags { get; set; } = new List<string>();
    }
}
