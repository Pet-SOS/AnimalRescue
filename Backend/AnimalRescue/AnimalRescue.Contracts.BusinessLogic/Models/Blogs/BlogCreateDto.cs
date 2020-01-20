using System.Collections.Generic;

namespace AnimalRescue.Contracts.BusinessLogic.Models.Blogs
{
	public class BlogCreateDto
	{
		public string Body { get; set; }

		public string Description { get; set; }

		public IList<string> ImagesIds { get; set; }
	}
}
