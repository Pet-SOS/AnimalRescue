using System;
using Newtonsoft.Json;
using System.Text.Json.Serialization;

using requestAdoptAnimal = AnimalRescue.Contracts.Common.Constants.PropertyConstants.RequestAdoptAnimal;
using person = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Person;

namespace AnimalRescue.API.Models.Messages
{
    public class RequestAdoptAnimalModel : BaseAndTimeModel<Guid>
    {
        [JsonPropertyName(requestAdoptAnimal.AnimalId)]
        [JsonProperty(requestAdoptAnimal.AnimalId)]
        public string AnimalId { get; set; }

        [JsonPropertyName(requestAdoptAnimal.AnimalName)]
        [JsonProperty(requestAdoptAnimal.AnimalName)]
        public string AnimalName { get; set; }

        [JsonPropertyName(requestAdoptAnimal.AdoptiveName)]
        [JsonProperty(requestAdoptAnimal.AdoptiveName)]
        public string AdoptiveName { get; set; }

        [JsonPropertyName(person.Phone)]
        [JsonProperty(person.Phone)]
        public string PhoneNumber { get; set; }
    }
}
