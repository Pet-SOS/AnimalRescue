
using Newtonsoft.Json;

using System.Text.Json.Serialization;

using baseitem = AnimalRescue.Contracts.Common.Constants.PropertyConstants.BaseItem;

namespace AnimalRescue.API.Models
{
    public class AnimalUpdateModel : AnimalCreateModel
    {
        [JsonPropertyName(baseitem.Id)]
        [JsonProperty(baseitem.Id)]
        public string Id { get; set; }     
    }
}
