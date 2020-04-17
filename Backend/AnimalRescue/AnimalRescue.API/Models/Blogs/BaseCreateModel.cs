using Microsoft.AspNetCore.Http;

using Newtonsoft.Json;

using System.Collections.Generic;
using System.Text.Json.Serialization;

using common = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Common;

namespace AnimalRescue.API.Models.Blogs
{
    public class BaseCreateModel
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

        [JsonPropertyName(common.Images)]
        [JsonProperty(common.Images)]
        public List<IFormFile> Images { get; set; } = new List<IFormFile>();

        [JsonPropertyName(common.Tags)]
        [JsonProperty(common.Tags)]
        public string Tags { get; set; }
    }
}
