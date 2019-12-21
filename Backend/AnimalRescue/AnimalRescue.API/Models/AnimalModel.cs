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
        public int Number { get; set; }

        [JsonPropertyName(common.Name)]
        public string Name { get; set; }

        [JsonPropertyName(animal.KindOfAnimal)]
        public string KindOfAnimal { get; set; }

        [JsonPropertyName(animal.Gender)]
        public string Gender { get; set; }

        [JsonPropertyName(common.Description)]
        public string Description { get; set; }

        [JsonPropertyName(animal.Age)]
        public int Age { get; set; }

        [JsonPropertyName(common.ImageIds)]
        public List<string> ImageLinks { get; set; }

        [JsonPropertyName(common.Tags)]
        public List<string> Tags { get; set; }
    }
}
