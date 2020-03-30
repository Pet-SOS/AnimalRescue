using System.Collections.Generic;
using System.Text.Json.Serialization;
using AnimalRescue.Contracts.Common.Constants;
using Newtonsoft.Json;

namespace AnimalRescue.API.Models.Tags
{
    public class WellKnownTagCreateUpdateModel
    {
        [JsonPropertyName(PropertyConstants.Common.Category)]
        [JsonProperty(PropertyConstants.Common.Category)]
        public string Category { get; set; }

        [JsonPropertyName(PropertyConstants.Animal.KindOfAnimal)]
        [JsonProperty(PropertyConstants.Animal.KindOfAnimal)]
        public string KindOfAnimal { get; set; }

        [JsonPropertyName(PropertyConstants.Common.Code)]
        [JsonProperty(PropertyConstants.Common.Code)]
        public string Code { get; set; }

        [JsonPropertyName(PropertyConstants.Common.Title)]
        [JsonProperty(PropertyConstants.Common.Title)]
        public string Title { get; set; }

        [JsonPropertyName(PropertyConstants.Common.Values)]
        [JsonProperty(PropertyConstants.Common.Values)]
        public List<LanguageValueModel> Values { get; set; }
    }
}
