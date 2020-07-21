using AnimalRescue.API.Models.Tags;

using Newtonsoft.Json;

using System.Collections.Generic;
using System.Text.Json.Serialization;

using common = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Common;
using person = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Person;

namespace AnimalRescue.API.Models.Configurations
{
    public class HomePopupModel
    {
        [JsonPropertyName(common.Title)]
        [JsonProperty(common.Title)]
        public List<LanguageValueModel> Title { get; set; }

        [JsonPropertyName(common.Text)]
        [JsonProperty(common.Text)]
        public List<LanguageValueModel> Text { get; set; }

        [JsonPropertyName(person.Email)]
        [JsonProperty(person.Email)]
        public string Email { get; set; }
    }
}
