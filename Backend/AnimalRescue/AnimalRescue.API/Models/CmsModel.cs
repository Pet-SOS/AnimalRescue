using Newtonsoft.Json;

using System.Collections.Generic;
using System.Text.Json.Serialization;

using cms = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Cms;

namespace AnimalRescue.API.Models
{
    public class CmsConfigurationModel : BaseModel
    {
        [JsonPropertyName(cms.Phones)]
        [JsonProperty(cms.Phones)]
        public List<string> Phones { get; set; }

        [JsonPropertyName(cms.SocialLinks)]
        [JsonProperty(cms.SocialLinks)]
        public Dictionary<string, string> SocialLinks { get; set; }
    }
}
