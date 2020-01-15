using System;
using System.Collections.Generic;

namespace AnimalRescue.Contracts.BusinessLogic.Models.Blogs
{
    public class BlogDto : BaseDto
    {
        public string Body { get; set; }

        public string Description { get; set; }

        public DateTimeOffset CreatedAt { get; set; }

        public IList<string> ImageIds { get; set; }
    }
}
