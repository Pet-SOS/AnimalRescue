using System.Collections.Generic;
using System.Threading.Tasks;
using AnimalRescue.Contracts;
using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.Models.DTO.Models;

namespace AnimalRescue.BusinessLogic.Services
{
	internal class BlogService : IBlogService
	{
		private readonly IBlogRepository _blogRepository;

		public BlogService(IBlogRepository blogRepository)
		{
			_blogRepository = blogRepository;
		}

		public async Task<IList<BlogModel>> GetAllBlogsAsync(int pageNumber, int pageSize)
		{
			var blogs = await _blogRepository.GetBlogsWithPagginationAsync(pageNumber, pageSize);

			throw new System.NotImplementedException();
		}
	}
}
