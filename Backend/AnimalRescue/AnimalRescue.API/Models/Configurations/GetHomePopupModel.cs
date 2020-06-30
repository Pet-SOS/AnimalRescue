using AnimalRescue.API.Models.Tags;
using Newtonsoft.Json;
using System.Text.Json.Serialization;
using common = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Common;
using person = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Person;

namespace AnimalRescue.API.Models.Configurations
{
    public class GetHomePopupModel
    {
        [JsonPropertyName(common.Title)]
        [JsonProperty(common.Title)]
        public TagLargeModel Title { get; set; }

        [JsonPropertyName(common.Text)]
        [JsonProperty(common.Text)]
        public TagLargeModel Text { get; set; }

        [JsonPropertyName(person.Email)]
        [JsonProperty(person.Email)]
        public string Email { get; set; }
    }
}
