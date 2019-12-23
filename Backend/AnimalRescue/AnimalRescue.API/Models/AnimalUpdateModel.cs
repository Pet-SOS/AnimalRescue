using Microsoft.AspNetCore.Http;

using Newtonsoft.Json;

using System.Collections.Generic;
using System.Text.Json.Serialization;

using common = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Common;

namespace AnimalRescue.API.Models
{
    public class AnimalUpdateModel : AnimalModel
    {
        [JsonPropertyName(common.Images)]
        [JsonProperty(common.Images)]
        public List<IFormFile> Images { get; set; } = new List<IFormFile>();  
    }
}
