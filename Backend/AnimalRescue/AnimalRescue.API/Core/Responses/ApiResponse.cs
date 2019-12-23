using Newtonsoft.Json;

namespace AnimalRescue.API.Core.Responses
{
    public class ApiResponse
    {
        [JsonProperty("_self")]
        public string Self { get; set; }
    }
}