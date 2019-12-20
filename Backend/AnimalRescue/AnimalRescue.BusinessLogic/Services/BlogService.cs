using AnimalRescue.BusinessLogic.Extensions;
using AnimalRescue.BusinessLogic.Models;
using AnimalRescue.Contracts;
using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Models;
using AnimalRescue.Infrastructure.Query;

using AutoMapper;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace AnimalRescue.BusinessLogic.Services
{
    internal class BlogService : IBlogService
	{
		private readonly IBlogRepository _blogRepository;
        private readonly IMapper mapper;

        public BlogService(IBlogRepository blogRepository, IMapper mapper)
		{
			_blogRepository = blogRepository;
            this.mapper = mapper;
        }

		public async Task<(List<BlogDto> collection, int totalCount)> GetAsync(ApiQueryRequest apiQueryRequest)
		{
            var dbQuery = apiQueryRequest.ToDbQuery();

            int totalCount = await _blogRepository.GetBlogsCountAsync(dbQuery);

			var blogs = await _blogRepository.GetBlogsWithPagginationAsync(dbQuery);

            var blogModels = mapper.Map<IList<Blog>, List<BlogDto>>(blogs);

            return (blogModels, totalCount);
		}
	}
}
