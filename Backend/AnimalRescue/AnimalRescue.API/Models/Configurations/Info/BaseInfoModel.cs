using AnimalRescue.API.Models.Tags;

using Newtonsoft.Json;

using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

using common = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Common;

namespace AnimalRescue.API.Models.Configurations.Info
{
    public class BaseInfoModel
    {
        [Required]
        [JsonPropertyName(common.Title)]
        [JsonProperty(common.Title)]
        public List<LanguageValueModel> Title { get; set; }

        [Required]
        [JsonPropertyName(common.Paragraphs)]
        [JsonProperty(common.Paragraphs)]
        public List<ParagraphModel> Paragraphs { get; set; }
    }
}
