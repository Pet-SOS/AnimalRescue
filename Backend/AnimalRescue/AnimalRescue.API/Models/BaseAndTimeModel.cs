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

        [JsonPropertyName(baseItem.IsDeleted)]
        [JsonProperty(baseItem.IsDeleted)]
        public bool IsDeleted { get; set; }

        [JsonPropertyName(baseItem.IsDeletable)]
        [JsonProperty(baseItem.IsDeletable)]
        public bool IsDeletable { get; set; }
    }
}
