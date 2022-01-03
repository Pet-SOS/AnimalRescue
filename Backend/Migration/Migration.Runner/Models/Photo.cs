using System.Text.Json.Serialization;

namespace Migration.Runner.Models
{
    public class Photo
    {
        [JsonPropertyName("url")]
        public string Url { get; set; }

        [JsonPropertyName("description")]
        public string Description { get; set; }
    }
}
