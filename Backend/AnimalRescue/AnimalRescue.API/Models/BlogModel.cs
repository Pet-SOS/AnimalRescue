using System;
using System.Collections.Generic;

namespace AnimalRescue.API.Models
{
	public class BlogModel : BaseModel
	{
		public string Body { get; set; }

		public string Description { get; set; }

		public DateTimeOffset CreatedAt { get; set; }

		public IList<string> ImageIds { get; set; }
	}
}
