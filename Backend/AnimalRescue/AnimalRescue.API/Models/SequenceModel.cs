using System.Text.Json.Serialization;
using AnimalRescue.Contracts.Common.Constants;
using Newtonsoft.Json;

namespace AnimalRescue.API.Models.Tags
{
    public class SequenceModel : BaseAndTimeModel
    {
        [JsonPropertyName(PropertyConstants.Animal.Number)]
        [JsonProperty(PropertyConstants.Animal.Number)]
        public int Number { get; set; }
    }
}
