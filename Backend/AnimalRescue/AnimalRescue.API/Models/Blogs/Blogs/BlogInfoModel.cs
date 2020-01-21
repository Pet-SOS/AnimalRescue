using Newtonsoft.Json;

using System.Text.Json.Serialization;

using common = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Common;

namespace AnimalRescue.API.Models.Blogs.Blogs
{
    public class BlogInfoModel : BaseInfoModel
    {
        [JsonPropertyName(common.Type)]
        [JsonProperty(common.Type)]
        public string Type { get; set; }
    }
}
