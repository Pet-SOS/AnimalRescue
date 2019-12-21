using Newtonsoft.Json;

using System.Collections.Generic;

using cms = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Cms;

namespace AnimalRescue.API.Models
{
    public class CmsConfigurationModel : BaseModel
    {
        [JsonProperty(PropertyName = cms.Phones)]
        public List<string> Phones { get; set; }

        [JsonProperty(PropertyName = cms.SocialLinks)]
        public Dictionary<string, string> SocialLinks { get; set; }
    }
}
