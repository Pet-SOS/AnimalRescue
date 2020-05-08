using System;
using AnimalRescue.API.Models.Tags;
using Newtonsoft.Json;
using System.Text.Json.Serialization;

using common = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Common;
using animal = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Animal;
using person = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Person;

namespace AnimalRescue.API.Models.Requests
{
    public class RequestModel : BaseAndTimeModel<Guid>
    {
        [JsonPropertyName(common.Case)]
        [JsonProperty(common.Case)]
        public WellKnownTagModel Case { get; set; }

        [JsonPropertyName(common.CaseDescription)]
        [JsonProperty(common.CaseDescription)]
        public string CaseDescription { get; set; }

        [JsonPropertyName(animal.KindOfAnimal)]
        [JsonProperty(animal.KindOfAnimal)]
        public WellKnownTagModel KindOfAnimal { get; set; }

        [JsonPropertyName(animal.AnimalState)]
        [JsonProperty(animal.AnimalState)]
        public WellKnownTagModel AnimalState { get; set; }

        [JsonPropertyName(animal.Status)]
        [JsonProperty(animal.Status)]
        public WellKnownTagModel Status { get; set; }

        [JsonPropertyName(animal.Birthday)]
        [JsonProperty(animal.Birthday)]
        public DateTime Birthday { get; set; }

        [JsonPropertyName(person.Address)]
        [JsonProperty(person.Address)]
        public string Address { get; set; }

        [JsonPropertyName(person.PersonState)]
        [JsonProperty(person.PersonState)]
        public WellKnownTagModel PersonState { get; set; }

        [JsonPropertyName(person.FirstName)]
        [JsonProperty(person.FirstName)]
        public string FirstName { get; set; }

        [JsonPropertyName(person.LastName)]
        [JsonProperty(person.LastName)]
        public string LastName { get; set; }

        [JsonPropertyName(person.Phone)]
        [JsonProperty(person.Phone)]
        public string Phone { get; set; }
    }
}
