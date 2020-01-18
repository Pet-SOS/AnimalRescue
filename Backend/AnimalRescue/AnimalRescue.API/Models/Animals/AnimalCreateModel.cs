using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;

using System.Collections.Generic;
using System.Text.Json.Serialization;

using animal = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Animal;
using common = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Common;

namespace AnimalRescue.API.Models.Animals
{
    public class AnimalCreateModel
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

        [JsonPropertyName(common.Images)]
        [JsonProperty(common.Images)]
        public List<IFormFile> Images { get; set; } = new List<IFormFile>();

        [JsonPropertyName(common.Tags)]
        [JsonProperty(common.Tags)]
        public string Tags { get; set; }
    }
}
