using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Text.Json.Serialization;

using Common = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Common;

namespace AnimalRescue.API.Models.Blogs.Commons
{
	public abstract class BlogCreateOrUpdateModel
	{
		[JsonPropertyName(Common.Body)]
		[JsonProperty(Common.Body)]
		public string Body { get; set; }

		[JsonPropertyName(Common.Description)]
		[JsonProperty(Common.Description)]
		public string Description { get; set; }

		[JsonPropertyName(Common.ImageIds)]
		[JsonProperty(Common.ImageIds)]
		public List<IFormFile> Images { get; set; }
	}
}
