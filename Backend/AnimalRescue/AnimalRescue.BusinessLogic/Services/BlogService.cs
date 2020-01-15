using AnimalRescue.BusinessLogic.Extensions;
using AnimalRescue.Contracts.BusinessLogic.Interfaces;
using AnimalRescue.Contracts.BusinessLogic.Models;
using AnimalRescue.Contracts.BusinessLogic.Models.Blogs;
using AnimalRescue.Contracts.Common.Query;
using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Models;
using AnimalRescue.Infrastructure.Validation;
using AutoMapper;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace AnimalRescue.BusinessLogic.Services
{
	internal class BlogService : IBlogService
	{
		private readonly IBlogRepository _blogRepository;
		private readonly IMapper _mapper;

		public BlogService(IBlogRepository blogRepository, IMapper mapper)
		{
			Require.Objects.NotNull(blogRepository, nameof(blogRepository));
			Require.Objects.NotNull(mapper, nameof(mapper));

			_blogRepository = blogRepository;
			_mapper = mapper;
		}

		public async Task<BlogDto> CreateAsync(BlogCreateDto blogCreateDto)
		{
			Require.Objects.NotNull(blogCreateDto, nameof(blogCreateDto));

			var blog = _mapper.Map<BlogCreateDto, Blog>(blogCreateDto);
			blog = await _blogRepository.CreateAsync(blog);

			return _mapper.Map<Blog, BlogDto>(blog);
		}

		public async Task DeleteAsync(string id)
		{
			Require.Strings.NotNullOrWhiteSpace(id, nameof(id));

			await _blogRepository.DeleteAsync(id);
		}

		public async Task<BlCollectonResponse<BlogDto>> GetAsync(ApiQueryRequest apiQueryRequest)
		{
			var dbQuery = apiQueryRequest.ToDbQuery();

			int totalCount = await _blogRepository.GetCountAsync(dbQuery);

			var blogs = await _blogRepository.GetAsync(dbQuery);

			var blogModels = _mapper.Map<IList<Blog>, List<BlogDto>>(blogs);

			return new BlCollectonResponse<BlogDto>
			{
				Collection = blogModels,
				TotalCount = totalCount
			};
		}

		public async Task<BlogDto> GetAsync(string id)
		{
			Require.Strings.NotNullOrWhiteSpace(id, nameof(id));
		
			var blog = await _blogRepository.GetAsync(id);
			Require.Objects.NotNull(blog, nameof(blog));

			return _mapper.Map<Blog, BlogDto>(blog);
		}

		public async Task UpdateAsync(BlogDto blogDto)
		{
			var blog = _mapper.Map<BlogDto, Blog>(blogDto);

			await _blogRepository.UpdateAsync(blog);
		}
	}
}
