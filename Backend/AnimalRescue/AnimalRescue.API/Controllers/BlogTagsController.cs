using AnimalRescue.API.Core.Responses;
using AnimalRescue.API.Models.Blogs.BlogTags;
using AnimalRescue.Contracts.BusinessLogic.Interfaces;
using AnimalRescue.Contracts.BusinessLogic.Models.Blogs;
using AnimalRescue.Contracts.Common.Query;
using AnimalRescue.Infrastructure.Validation;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;

namespace AnimalRescue.API.Controllers
{
    public class BlogTagsController : ApiControllerBase
    {
        private readonly IBlogTagService _blogTagService;

        private readonly ILogger<BlogTagsController> _logger;

        private readonly IMapper _mapper;

        public BlogTagsController(
            IBlogTagService blogTagService,
            ILogger<BlogTagsController> logger,
            IMapper mapper)
        {
            Require.Objects.NotNull(blogTagService, nameof(blogTagService));
            Require.Objects.NotNull(logger, nameof(logger));
            Require.Objects.NotNull(mapper, nameof(mapper));

            _blogTagService = blogTagService;
            _logger = logger;
            _mapper = mapper;
        }

        [HttpGet("{id}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task<ActionResult<BlogTagModel>> GetItemByIdAsync([FromRoute] string id)
        {
            return await GetItemAsync<BlogTagDto, BlogTagModel>(_blogTagService, id, _mapper);
        }

        [HttpGet]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task<ActionResult<CollectionSegmentApiResponse<BlogTagModel>>> GetAsync([FromQuery]ApiQueryRequest queryRequest)
        {
            return await GetCollectionAsync<BlogTagDto, BlogTagModel>(_blogTagService, queryRequest, _mapper);
        }

        [HttpPost]
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        public async Task<ActionResult<BlogTagModel>> CreateItemAsync([FromForm] BlogTagCreateModel blogTagCreateModel)
        {
            var blogTagModel = _mapper.Map<BlogTagCreateModel, BlogTagModel>(blogTagCreateModel);
            return await CreatedItemAsync(_blogTagService, blogTagModel, _mapper);
        }

        [HttpPut]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task UpdateAsync([FromForm] BlogTagUpdateModel blogTagUpdateModel)
        {
            var blogTagModel = _mapper.Map<BlogTagUpdateModel, BlogTagModel>(blogTagUpdateModel);
            await UpdateDataAsync(_blogTagService, blogTagModel, _mapper);
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task DeleteAsync([FromRoute] string id)
        {
            await _blogTagService.DeleteAsync(id);
        }
    }
}