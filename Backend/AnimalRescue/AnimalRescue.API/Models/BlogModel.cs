using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

using baseItem = AnimalRescue.Contracts.Common.Constants.PropertyConstants.BaseItem;
using common = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Common;

namespace AnimalRescue.API.Models
{
    public class BlogModel : BaseModel
    {
        [JsonPropertyName(common.Body)]
        public string Body { get; set; }

        [JsonPropertyName(common.Description)]
        public string Description { get; set; }

        [JsonPropertyName(baseItem.CreatedAt)]
        public DateTimeOffset CreatedAt { get; set; }

        [JsonPropertyName(common.ImageIds)]
        public IList<string> ImageIds { get; set; }
    }
}
