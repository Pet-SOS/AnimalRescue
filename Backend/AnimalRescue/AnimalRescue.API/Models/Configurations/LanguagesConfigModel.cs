using Newtonsoft.Json;

using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

using common = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Common;

namespace AnimalRescue.API.Models.Configurations
{
    public class LanguagesConfigModel
    {
        [Required]
        [JsonPropertyName(common.Languages)]
        [JsonProperty(common.Languages)]
        public Dictionary<string, bool> Languages { get; set; }
    }
}
