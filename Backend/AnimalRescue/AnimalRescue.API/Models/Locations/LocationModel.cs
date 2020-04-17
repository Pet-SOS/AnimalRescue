using AnimalRescue.API.Models.Tags;

using Newtonsoft.Json;

using System;
using System.Text.Json.Serialization;

using common = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Common;
using person = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Person;

namespace AnimalRescue.API.Models.Locations
{
    public class LocationModel : BaseAndTimeModel<Guid>
    {
        [JsonPropertyName(common.Title)]
        [JsonProperty(common.Title)]
        public string Title { get; set; }

        [JsonPropertyName(person.Phone)]
        [JsonProperty(person.Phone)]
        public string Phone { get; set; }

        [JsonPropertyName(person.Address)]
        [JsonProperty(person.Address)]
        public string Address { get; set; }

        [JsonPropertyName(common.Price)]
        [JsonProperty(common.Price)]
        public string Price { get; set; }

        [JsonPropertyName(common.Type)]
        [JsonProperty(common.Type)]
        public WellKnownTagModel Type { get; set; }
    }
}
