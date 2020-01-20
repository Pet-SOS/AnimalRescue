using AnimalRescue.Contracts.Common.Constants;
using Newtonsoft.Json;
using System.Text.Json.Serialization;

namespace AnimalRescue.API.Models.Blogs.BlogTags
{
    public class BlogTagModel : BaseAndTimeModel
    {
        [JsonPropertyName(PropertyConstants.Common.Type)]
        [JsonProperty(PropertyConstants.Common.Type)]
        public string Type { get; set; }

        [JsonPropertyName(PropertyConstants.Common.Title)]
        [JsonProperty(PropertyConstants.Common.Title)]
        public string Title { get; set; }
    }
}
