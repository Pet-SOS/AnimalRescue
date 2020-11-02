using Newtonsoft.Json;

using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

using common = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Common;

namespace AnimalRescue.API.Models.Blogs.Blogs
{
	public sealed class BlogUpdateModel : BaseUpdateModel
	{
		[JsonPropertyName(common.ImageIds)]
		[JsonProperty(common.ImageIds)]
		public List<Guid> ImageIds { get; set; } = new List<Guid>();
	}
}
