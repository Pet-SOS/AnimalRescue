using AnimalRescue.API.Core.Responses;
using AnimalRescue.API.Models;
using AnimalRescue.Contracts.BusinessLogic.Interfaces;
using AnimalRescue.Contracts.BusinessLogic.Models;
using AnimalRescue.Contracts.Common.Query;

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
		private readonly IMapper _mapper;
		private readonly ILogger<BlogsController> _logger;

		public BlogsController(IBlogService blogService, IMapper mapper, ILogger<BlogsController> logger)
		{
			_blogService = blogService;
			_mapper = mapper;
			_logger = logger;
		}
		
		[Route("")]
		[HttpGet]
		[ProducesResponseType((int)HttpStatusCode.OK, Type = typeof(IList<BlogModel>))]
		public async Task<ActionResult<CollectionSegmentApiResponse<BlogModel>>> GetAllBlogsAsync([FromQuery]ApiQueryRequest queryRequest)
		{
            return await GetCollectionAsync<BlogDto, BlogModel>(_blogService, queryRequest, _mapper);
        }
    }
}