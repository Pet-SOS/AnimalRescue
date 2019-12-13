using System;
using System.Collections.Generic;

namespace AnimalRescue.Models.DTO.Models
{
    public class PostDto : BaseDto
    {
        public DateTime CreatedAt { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public List<string> Tags { get; set; }
    }
}
