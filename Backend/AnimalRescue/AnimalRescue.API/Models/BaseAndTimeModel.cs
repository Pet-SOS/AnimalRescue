using Newtonsoft.Json;

using System;
using System.Text.Json.Serialization;

using baseItem = AnimalRescue.Contracts.Common.Constants.PropertyConstants.BaseItem;

namespace AnimalRescue.API.Models
{
    public class BaseAndTimeModel<TId> : BaseModel<TId>
    {
        [JsonPropertyName(baseItem.CreatedAt)]
        [JsonProperty(baseItem.CreatedAt)]
        public DateTime CreatedAt { get; set; }
        
        [JsonPropertyName(baseItem.ModifiedAt)]
        [JsonProperty(baseItem.ModifiedAt)]
        public DateTime? ModifiedAt { get; set; }
    }
}
