using AnimalRescue.Contracts.BusinessLogic.Attributes;

using System;
using System.Collections.Generic;

using common = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Common;

namespace AnimalRescue.Contracts.BusinessLogic.Models.Blogs
{
	public class BlogCreateDto
	{
		[CouplingPropertyDto(common.Body)]
		public string Body { get; set; }

		[CouplingPropertyDto(common.Description)]
		public string Description { get; set; }

		[CouplingPropertyDto(common.ImageIds)]
		public List<Guid> ImageIds { get; set; }
	}
}
