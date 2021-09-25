using AnimalRescue.API.Models.Tags;

using Newtonsoft.Json;

using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

using animal = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Animal;
using common = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Common;

namespace AnimalRescue.API.Models.Animals
{
    public class AnimalModel : BaseAndTimeModel<Guid>
    {
        [JsonPropertyName(animal.Number)]
        [JsonProperty(animal.Number)]
        public int Number { get; set; }

        [JsonPropertyName(animal.Names)]
        [JsonProperty(animal.Names)]
        public List<LanguageValueModel> Names { get; set; }

        [JsonPropertyName(animal.KindOfAnimal)]
        [JsonProperty(animal.KindOfAnimal)]
        public string KindOfAnimal { get; set; }

        [JsonPropertyName(animal.Gender)]
        [JsonProperty(animal.Gender)]
        public string Gender { get; set; }

        [JsonPropertyName(common.Description)]
        [JsonProperty(common.Description)]
        public List<LanguageValueModel> Description { get; set; }

        [JsonPropertyName(common.ImageIds)]
        [JsonProperty(common.ImageIds)]
        public List<Guid> ImageIds { get; set; } = new List<Guid>();

        [JsonPropertyName(common.Tags)]
        [JsonProperty(common.Tags)]
        public List<string> Tags { get; set; } = new List<string>();

        [JsonPropertyName(animal.CoverImage)]
        [JsonProperty(animal.CoverImage)]
        public int CoverImage { get; set; }

        [JsonPropertyName(animal.Birthday)]
        [JsonProperty(animal.Birthday)]
        public DateTime Birthday { get; set; }

        [JsonPropertyName(animal.Character)]
        [JsonProperty(animal.Character)]
        public List<LanguageValueModel> Character { get; set; }

        [JsonPropertyName(animal.Status)]
        [JsonProperty(animal.Status)]
        public WellKnownTagModel Status { get; set; }

        [JsonPropertyName(animal.LocationTypeId)]
        [JsonProperty(animal.LocationTypeId)]
        public Guid LocationTypeId { get; set; }

        [JsonPropertyName(animal.LocationName)]
        [JsonProperty(animal.LocationName)]
        public string LocationName { get; set; }

        [JsonPropertyName(animal.IsDonationActive)]
        [JsonProperty(animal.IsDonationActive)]
        public bool IsDonationActive { get; set; }

        [JsonPropertyName(animal.BannerText)]
        [JsonProperty(animal.BannerText)]
        public List<LanguageValueModel> BannerText { get; set; }

        [JsonPropertyName(animal.AdoptiveName)]
        [JsonProperty(animal.AdoptiveName)]
        public string AdoptiveName { get; set; }

        [JsonPropertyName(animal.AdoptivePhone)]
        [JsonProperty(animal.AdoptivePhone)]
        public string AdoptivePhone { get; set; }

        [JsonPropertyName(animal.AdoptionContractFileId)]
        [JsonProperty(animal.AdoptionContractFileId)]
        public Guid? AdoptionContractFileId { get; set; }
    }
}
