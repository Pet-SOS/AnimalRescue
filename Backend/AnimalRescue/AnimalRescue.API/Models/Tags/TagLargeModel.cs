using AnimalRescue.Contracts.Common.Constants;

using Newtonsoft.Json;

using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace AnimalRescue.API.Models.Tags
{
    public class TagLargeModel : BaseAndTimeModel<string>
    {
        [JsonPropertyName(PropertyConstants.Common.Category)]
        [JsonProperty(PropertyConstants.Common.Category)]
        public string Category { get; set; }

        [JsonPropertyName(PropertyConstants.Common.Code)]
        [JsonProperty(PropertyConstants.Common.Code)]
        public string Code { get; set; }

        [JsonPropertyName(PropertyConstants.Common.Values)]
        [JsonProperty(PropertyConstants.Common.Values)]
        public List<LanguageValueModel> Values { get; set; }


        [JsonPropertyName(PropertyConstants.BaseItem.IsDeletable)]
        [JsonProperty(PropertyConstants.BaseItem.IsDeletable)]
        public bool IsDeletable { get; set; }
    }
}
