using Newtonsoft.Json;

using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

using common = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Common;

namespace AnimalRescue.API.Models.Blogs
{
    public class BaseInfoModel : BaseAndTimeModel
    {
        [JsonPropertyName(common.Type)]
        [JsonProperty(common.Type)]
        public string Type { get; set; }

        [JsonPropertyName(common.Title)]
        [JsonProperty(common.Title)]
        public string Title { get; set; }

        [JsonPropertyName(common.Body)]
        [JsonProperty(common.Body)]
        public string Body { get; set; }

        [JsonProperty(common.ImageIds)]
        public List<Guid> ImageIds { get; set; } = new List<Guid>();

        [JsonPropertyName(common.Tags)]
        [JsonProperty(common.Tags)]
        public List<string> Tags { get; set; } = new List<string>();
    }
}
