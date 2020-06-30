using AnimalRescue.API.Models.Tags;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Text.Json.Serialization;
using common = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Common;

namespace AnimalRescue.API.Models.Configurations.Info
{
    public class BaseInfoModel
    {
        [JsonPropertyName(common.Title)]
        [JsonProperty(common.Title)]
        public TagLargeModel Title { get; set; }

        [JsonPropertyName(common.Paragraphs)]
        [JsonProperty(common.Paragraphs)]
        public List<TagLargeModel> Paragraphs { get; set; }
    }
}
