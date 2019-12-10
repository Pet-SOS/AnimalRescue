using System;
using System.Collections.Generic;
using System.Text;

namespace AnimalRescue.Models.DTO.Models
{
    public class PostModel : BaseModel
    {
        public DateTime CreatedAt { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public List<string> Tags { get; set; }
    }
}
