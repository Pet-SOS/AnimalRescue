using Microsoft.AspNetCore.Http;

using Newtonsoft.Json;

using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

using animal = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Animal;
using common = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Common;

namespace AnimalRescue.API.Models.Animals
{
    public class AnimalCreateUpdateModel
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

        [JsonPropertyName(animal.CoverImage)]
        [JsonProperty(animal.CoverImage)]
        public int CoverImage { get; set; }

        [JsonPropertyName(animal.Birthday)]
        [JsonProperty(animal.Birthday)]
        public DateTime Birthday { get; set; }

        [JsonPropertyName(animal.Character)]
        [JsonProperty(animal.Character)]
        public string Character { get; set; }

        [JsonPropertyName(animal.Status)]
        [JsonProperty(animal.Status)]
        public string Status { get; set; }

        [JsonPropertyName(animal.LocationType)]
        [JsonProperty(animal.LocationType)]
        public string LocationType { get; set; }

        [JsonPropertyName(animal.LocationName)]
        [JsonProperty(animal.LocationName)]
        public string LocationName { get; set; }

        [JsonPropertyName(animal.IsDonationActive)]
        [JsonProperty(animal.IsDonationActive)]
        public bool IsDonationActive { get; set; }

        [JsonPropertyName(animal.BannerText)]
        [JsonProperty(animal.BannerText)]
        public string BannerText { get; set; }
    }
}
