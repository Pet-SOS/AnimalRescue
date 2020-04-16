using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

using baseItem = AnimalRescue.Contracts.Common.Constants.PropertyConstants.BaseItem;

namespace AnimalRescue.API.Models
{
    public class DeletableCreateUpdateModel
    {
        [Required]
        [JsonPropertyName(baseItem.IsDeletable)]
        [JsonProperty(baseItem.IsDeletable)]
        public bool IsDeletable { get; set; }
    }
}
