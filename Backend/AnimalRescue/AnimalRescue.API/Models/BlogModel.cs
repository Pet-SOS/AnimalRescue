using Newtonsoft.Json;

using System;
using System.Collections.Generic;

using baseItem = AnimalRescue.Contracts.Common.Constants.PropertyConstants.BaseItem;
using common = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Common;

namespace AnimalRescue.API.Models
{
    public class BlogModel : BaseModel
    {
        [JsonProperty(PropertyName = common.Body)]
        public string Body { get; set; }

        [JsonProperty(PropertyName = common.Description)]
        public string Description { get; set; }

        [JsonProperty(PropertyName = baseItem.CreatedAt)]
        public DateTimeOffset CreatedAt { get; set; }

        [JsonProperty(PropertyName = common.ImageIds)]
        public IList<string> ImageIds { get; set; }
    }
}
