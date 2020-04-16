using AnimalRescue.Contracts.Common.Constants;

using Newtonsoft.Json;

using System;
using System.Text.Json.Serialization;

namespace AnimalRescue.API.Models.Tags
{
    public class SequenceModel : BaseAndTimeModel<Guid>
    {
        [JsonPropertyName(PropertyConstants.Animal.Number)]
        [JsonProperty(PropertyConstants.Animal.Number)]
        public int Number { get; set; }
    }
}
