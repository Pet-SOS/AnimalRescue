using AnimalRescue.API.Models.Tags;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using common = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Common;

namespace AnimalRescue.API.Models.Configurations.Info
{
    public class ParagraphModel
    {
        [MaxLength(50)]
        [JsonPropertyName(common.Name)]
        [JsonProperty(common.Name)]
        public string Name { get; set; }

        [Required]
        [JsonPropertyName(common.Values)]
        [JsonProperty(common.Values)]
        public List<LanguageValueModel> Values { get; set; }
    }
}
