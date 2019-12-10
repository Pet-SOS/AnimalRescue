using Newtonsoft.Json;

namespace AnimalRescue.Contracts.Responses
{
    public class ApiResponse
    {
        [JsonProperty("_self")]
        public string Self { get; set; }
    }
}