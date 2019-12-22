using Newtonsoft.Json;

using System.Collections.Generic;
using System.Text.Json.Serialization;

using animal = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Animal;
using common = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Common;

namespace AnimalRescue.API.Models
{
    public class AnimalModel : BaseModel
    {
        [JsonPropertyName(animal.Number)]
        [JsonProperty(animal.Number)]
        public int Number { get; set; }

        [JsonPropertyName(common.Name)]
        [JsonProperty(common.Name)]
        public string Name { get; set; }

        [JsonPropertyName(animal.KindOfAnimal)]
        [JsonProperty(animal.KindOfAnimal)]
        public string KindOfAnimal { get; set; }

        [JsonPropertyName(animal.Gender)]
        [JsonProperty(animal.Gender)]
        public string Gender { get; set; }

        [JsonPropertyName(common.Description)]
        [JsonProperty(common.Description)]
        public string Description { get; set; }

        [JsonPropertyName(animal.Age)]
        [JsonProperty(animal.Age)]
        public int Age { get; set; }

        [JsonPropertyName(common.ImageIds)]
        [JsonProperty(common.ImageIds)]
        public List<string> ImageLinks { get; set; }

        [JsonPropertyName(common.Tags)]
        [JsonProperty(common.Tags)]
        public List<string> Tags { get; set; }
    }
}
