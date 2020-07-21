using AnimalRescue.Contracts.Common.Constants;

using Newtonsoft.Json;

using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace AnimalRescue.API.Models.Tags
{
    public class LanguageValueModel
    {
        [Required]
        [MaxLength(4, ErrorMessage = "Language name should not be more than 4 symbols")]
        [JsonPropertyName(PropertyConstants.Common.Lang)]
        [JsonProperty(PropertyConstants.Common.Lang)]
        public string Lang { get; set; }

        [Required]
        [MaxLength(1000, ErrorMessage = "Value name should not be more than 1000 symbols")]
        [JsonPropertyName(PropertyConstants.Common.Value)]
        [JsonProperty(PropertyConstants.Common.Value)]
        public string Value { get; set; }
    }
}
