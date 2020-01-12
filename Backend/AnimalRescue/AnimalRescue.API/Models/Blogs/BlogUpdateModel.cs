using AnimalRescue.API.Models.Blogs.Commons;

namespace AnimalRescue.API.Models.Blogs
{
	public sealed class BlogUpdateModel : BlogCreateOrUpdateModel
	{
		public string Id { get; set; }
	}
}
