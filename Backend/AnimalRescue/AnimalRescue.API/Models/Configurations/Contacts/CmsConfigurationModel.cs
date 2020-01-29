using Newtonsoft.Json;

using System.Collections.Generic;
using System.Text.Json.Serialization;

using cms = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Cms;
using person = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Person;

namespace AnimalRescue.API.Models.Configurations.Contacts
{
    public class CmsConfigurationModel
    {
        [JsonPropertyName(cms.Phones)]
        [JsonProperty(cms.Phones)]
        public List<string> Phones { get; set; }

        [JsonPropertyName(cms.SocialLinks)]
        [JsonProperty(cms.SocialLinks)]
        public Dictionary<string, string> SocialLinks { get; set; }

        [JsonPropertyName(person.Emails)]
        [JsonProperty(person.Emails)]
        public Dictionary<string, string> Emails { get; set; }

        [JsonPropertyName(person.Addresses)]
        [JsonProperty(person.Addresses)]
        public Dictionary<string, string> Addresses { get; set; }

    }
}
