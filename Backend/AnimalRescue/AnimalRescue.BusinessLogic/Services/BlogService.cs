using AnimalRescue.BusinessLogic.Extensions;
using AnimalRescue.Contracts.BusinessLogic.Interfaces;
using AnimalRescue.Contracts.BusinessLogic.Models;
using AnimalRescue.Contracts.BusinessLogic.Models.Blogs;
using AnimalRescue.Contracts.Common.Query;
using AnimalRescue.DataAccess.Mongodb.Exceptions;
using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Models;
using AnimalRescue.Infrastructure.Validation;

using AutoMapper;

using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AnimalRescue.BusinessLogic.Services
{
	internal class BlogService : IBlFullCrud<BlogDto, BlogDto>
	{
		private readonly IArticleRepository _blogRepository;
		private readonly IMapper _mapper;

		public BlogService(IArticleRepository blogRepository, IMapper mapper)
		{
			Require.Objects.NotNull(blogRepository, nameof(blogRepository));
			Require.Objects.NotNull(mapper, nameof(mapper));

			_blogRepository = blogRepository;
			_mapper = mapper;
		}

		public async Task<BlogDto> CreateAsync(BlogDto blogCreateDto)
		{
			Require.Objects.NotNull(blogCreateDto, nameof(blogCreateDto));

			var blog = _mapper.Map<BlogDto, Article>(blogCreateDto);
			blog = await _blogRepository.CreateAsync(blog);

			return _mapper.Map<Article, BlogDto>(blog);
		}

		public async Task DeleteAsync(Guid id)
		{
			await _blogRepository.DeleteAsync(id.AsObjectIdString());
		}

		public async Task<BlCollectonResponse<BlogDto>> GetAsync(ApiQueryRequest apiQueryRequest)
		{
			var dbQuery = apiQueryRequest.ToDbQuery();

			int totalCount = await _blogRepository.GetCountAsync(dbQuery);

			var blogs = await _blogRepository.GetAsync(dbQuery);

			var blogModels = _mapper.Map<IList<Article>, List<BlogDto>>(blogs);

			return new BlCollectonResponse<BlogDto>
			{
				Collection = blogModels,
				TotalCount = totalCount
			};
		}

		public async Task<BlogDto> GetAsync(Guid id)
		{
			var blog = await _blogRepository.GetAsync(id.AsObjectIdString());
			Require.Objects.NotNull(blog, nameof(blog));

			return _mapper.Map<Article, BlogDto>(blog);
		}

		public async Task<int> GetCountAsync(ApiQueryRequest query)
		{
			var dbQuery = query.ToDbQuery();

			return await _blogRepository.GetCountAsync(dbQuery);
		}

		public async Task UpdateAsync(BlogDto blogDto)
		{
			var blog = _mapper.Map<BlogDto, Article>(blogDto);

			await _blogRepository.UpdateAsync(blog);
		}
	}
}
