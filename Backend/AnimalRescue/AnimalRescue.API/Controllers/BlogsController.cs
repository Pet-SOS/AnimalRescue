using AnimalRescue.API.Core.Responses;
using AnimalRescue.API.Models.Blogs.Blogs;
using AnimalRescue.Contracts.BusinessLogic.Interfaces;
using AnimalRescue.Contracts.BusinessLogic.Models.Blogs;
using AnimalRescue.Contracts.Common.Query;
using AnimalRescue.Infrastructure.Validation;

using AutoMapper;

using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;

namespace AnimalRescue.API.Controllers
{
	public class BlogsController : ApiControllerBase
	{
		private readonly IBlogService _blogService;
		private readonly IDocumentService _documentService;
		private readonly IMapper _mapper;
		private readonly ILogger<BlogsController> _logger;

		public BlogsController(IBlogService blogService,
			IDocumentService documentService,
			IMapper mapper,
			ILogger<BlogsController> logger)
		{
			_blogService = blogService;
			_documentService = documentService;
			_mapper = mapper;
			_logger = logger;
		}

		[Route("{id}")]
		[HttpGet]
		[ProducesResponseType((int)HttpStatusCode.OK, Type = typeof(BlogInfoModel))]
		public async Task<ActionResult<BlogInfoModel>> GetItemByIdAsync(string id)
		{
			Require.Strings.NotNullOrWhiteSpace(id, nameof(id));

			return await GetItemAsync<BlogDto, BlogInfoModel>(_blogService, id, _mapper);
		}


		[Route("")]
		[HttpGet]
		[ProducesResponseType((int)HttpStatusCode.OK, Type = typeof(IList<BlogInfoModel>))]
		public async Task<ActionResult<CollectionSegmentApiResponse<BlogInfoModel>>> GetAsync([FromQuery]ApiQueryRequest queryRequest)
		{
			return await GetCollectionAsync<BlogDto, BlogInfoModel>(_blogService, queryRequest, _mapper);
		}

		//[Route("")]
		//[HttpPost]
		//[ProducesResponseType((int)HttpStatusCode.OK, Type = typeof(BlogInfoModel))]
		//public async Task<ActionResult<BlogInfoModel>> CreateBlogAsync([FromForm] BlogCreateModel blogCreateModel)
		//{
		//	Require.Objects.NotNull(blogCreateModel, nameof(blogCreateModel));

		//	return await CreatedItemAsync<BlogDto, BlogCreateModel, BlogInfoModel>(_blogService, _documentService, blogCreateModel, blogCreateModel.Images, _mapper);
		//}

		[Route("{id}")]
		[HttpDelete]
		public async Task DeleteBlogAsync(string id)
		{
			Require.Strings.NotNullOrWhiteSpace(id, nameof(id));

			await _blogService.DeleteAsync(id);
		}

		//[Route("")]
		//[HttpPut("{id}")]
		//public async Task UpdateBlogAsync([FromRoute] string id, [FromForm] BlogUpdateModel blogUpdateModel)
		//{
		//	Require.Objects.NotNull(blogUpdateModel, nameof(blogUpdateModel));

		//	await UpdateDataAsync(_blogService, _documentService, id, blogUpdateModel, blogUpdateModel.Images, _mapper); 
		//}
	}
}