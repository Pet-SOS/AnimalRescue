using AnimalRescue.Contracts.BusinessLogic.Attributes;
using common = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Common;

using System.Collections.Generic;

namespace AnimalRescue.Contracts.BusinessLogic.Models.Blogs
{
	public class BlogCreateDto
	{
		[CouplingPropertyDto(common.Body)]
		public string Body { get; set; }

		[CouplingPropertyDto(common.Description)]
		public string Description { get; set; }

		[CouplingPropertyDto(common.ImageIds)]
		public IList<string> ImagesIds { get; set; }
	}
}
