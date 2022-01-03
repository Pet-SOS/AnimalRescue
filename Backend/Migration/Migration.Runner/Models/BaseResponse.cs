using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Migration.Runner.Models
{
    public class BaseResponse<T>
    {

        [JsonPropertyName("count")]
        public int Count { get; set; }

        [JsonPropertyName("include-deleted")]
        public bool IncludeDeleted { get; set; }

        [JsonPropertyName("list")]
        public IEnumerable<T> List { get; set; }
    }
}
