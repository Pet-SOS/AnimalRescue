using System.Collections.Generic;

namespace AnimalRescue.Contracts.BusinessLogic.Models
{
    public class StoryDto : BaseDto
    {
        public string Title { get; set; }
        public string Body { get; set; }
        public List<string> ImageLinks { get; set; }
    }
}
