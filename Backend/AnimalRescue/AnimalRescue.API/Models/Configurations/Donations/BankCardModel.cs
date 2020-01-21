using Newtonsoft.Json;

using System.Text.Json.Serialization;

using cms = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Cms;
using person = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Person;

namespace AnimalRescue.API.Models.Configurations.Donations
{
    public class BankCardModel
    {
        [JsonPropertyName(cms.CardNumber)]
        [JsonProperty(cms.CardNumber)]
        public string CardNumber { get; set; }

        [JsonPropertyName(cms.EDRPOU)]
        [JsonProperty(cms.EDRPOU)]
        public string EDRPOU { get; set; }

        [JsonPropertyName(cms.BankName)]
        [JsonProperty(cms.BankName)]
        public string BankName { get; set; }

        [JsonPropertyName(person.FirstName)]
        [JsonProperty(person.FirstName)]
        public string FirstName { get; set; }

        [JsonPropertyName(person.LastName)]
        [JsonProperty(person.LastName)]
        public string LastName { get; set; }       
    }
}
