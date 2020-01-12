using AnimalRescue.API.Core.Responses;
using AnimalRescue.API.Models;
using AnimalRescue.API.Models.Blogs;
using AnimalRescue.Contracts.BusinessLogic.Interfaces;
using AnimalRescue.Contracts.BusinessLogic.Models.Blogs;
using AnimalRescue.Contracts.Common.Query;

using AutoMapper;

using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
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

		[Route("{blogId}")]
		[HttpGet]
		[ProducesResponseType((int)HttpStatusCode.OK, Type = typeof(BlogInfoModel))]
		public async Task<ActionResult<BlogInfoModel>> GetBlogByIdAsync(string blogId)
		{
			if (string.IsNullOrWhiteSpace(blogId))
			{
				_logger.LogError("blogId argument is not provided");
				throw new ArgumentException(nameof(blogId));
			}

			var blogDto = await _blogService.GetAsync(blogId);

			return _mapper.Map<BlogDto, BlogInfoModel>(blogDto);
		}


		[Route("")]
		[HttpGet]
		[ProducesResponseType((int)HttpStatusCode.OK, Type = typeof(IList<BlogInfoModel>))]
		public async Task<ActionResult<CollectionSegmentApiResponse<BlogInfoModel>>> GetAllBlogsAsync([FromQuery]ApiQueryRequest queryRequest)
		{
            return await GetCollectionAsync<BlogDto, BlogInfoModel>(_blogService, queryRequest, _mapper);
        }

		[Route("")]
		[HttpPost]
		[ProducesResponseType((int)HttpStatusCode.OK, Type = typeof(BlogInfoModel))]
		public async Task<ActionResult<BlogInfoModel>> CreateBlogAsync([FromForm] BlogCreateModel blogCreateModel)
		{
			if (blogCreateModel == null)
			{
				_logger.LogError("blogCreateModel is not provided");
				throw new ArgumentException(nameof(blogCreateModel));
			}

			var imagesIds = await _documentService.UploadFileAsync(blogCreateModel.Images);

			var blogCreateDto = _mapper.Map<BlogCreateModel, BlogCreateDto>(blogCreateModel);

			blogCreateDto.ImagesIds = imagesIds;
			var bloDtog = await _blogService.CreateAsync(blogCreateDto);

			return _mapper.Map<BlogDto, BlogInfoModel>(bloDtog);
		}


		[Route("{blogId}")]
		[HttpDelete]
		public async Task DeleteBlogAsync(string blogId)
		{
			if (string.IsNullOrWhiteSpace(blogId))
			{
				_logger.LogError("blogId argument is not provided");
				throw new ArgumentException(nameof(blogId));
			}

			await _blogService.DeleteAsync(blogId);
		}

		[Route("")]
		[HttpPut]
		public async Task UpdateBlogAsync([FromForm] BlogUpdateModel blogUpdateModel)
		{
			if (blogUpdateModel == null)
			{
				_logger.LogError("blogUpdateModel argument is not provided");
				throw new ArgumentException(nameof(blogUpdateModel));
			}

			var imagesIds = await _documentService.UploadFileAsync(blogUpdateModel.Images);

			var blogDto = _mapper.Map<BlogUpdateModel, BlogDto>(blogUpdateModel);

			blogDto.ImageIds = imagesIds;

			await _blogService.UpdateAsync(blogDto);
		}
	}
}