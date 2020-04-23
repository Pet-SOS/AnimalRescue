using Newtonsoft.Json;

using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

using common = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Common;
using person = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Person;

namespace AnimalRescue.API.Models.Locations
{
    public class LocationCreateUpdateModel
    {
        [Required]
        [JsonPropertyName(common.Title)]
        [JsonProperty(common.Title)]
        public string Title { get; set; }

        [JsonPropertyName(person.Phone)]
        [JsonProperty(person.Phone)]
        public string Phone { get; set; }

        [Required]
        [JsonPropertyName(person.Address)]
        [JsonProperty(person.Address)]
        public string Address { get; set; }

        [JsonPropertyName(common.Price)]
        [JsonProperty(common.Price)]
        public string Price { get; set; }

        [Required]
        [JsonPropertyName(common.Type)]
        [JsonProperty(common.Type)]
        public string Type { get; set; }
    }
}
