using Newtonsoft.Json;

using System.Text.Json.Serialization;

using person = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Person;

namespace AnimalRescue.API.Models.Configurations.Info
{
    public class HomePopupModel : BaseInfoModel
    {
        [JsonPropertyName(person.Email)]
        [JsonProperty(person.Email)]
        public string Email { get; set; }
    }
}
