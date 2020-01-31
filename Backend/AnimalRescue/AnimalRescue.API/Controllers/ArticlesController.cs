using AnimalRescue.API.Core.Responses;
using AnimalRescue.API.Models.Blogs.Articles;
using AnimalRescue.Contracts.BusinessLogic.Interfaces;
using AnimalRescue.Contracts.BusinessLogic.Models.Blogs;
using AnimalRescue.Contracts.Common.Query;
using AnimalRescue.Infrastructure.Validation;

using AutoMapper;

using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.Extensions.Logging;

using System;
using System.Threading.Tasks;

namespace AnimalRescue.API.Controllers
{
    public class ArticlesController : ApiControllerBase
    {
        private readonly ILogger<ArticlesController> _logger;
        private readonly IArticleService _articleService;
        private readonly IImageService _imageService;
        public readonly IMapper _mapper;

        public ArticlesController(
            ILogger<ArticlesController> logger,
            IMapper mapper,
            IArticleService articleService,
            IImageService imageService)
        {
            Require.Objects.NotNull(logger, nameof(logger));
            Require.Objects.NotNull(mapper, nameof(mapper));
            Require.Objects.NotNull(articleService, nameof(articleService));
            Require.Objects.NotNull(imageService, nameof(imageService));

            _logger = logger;
            _mapper = mapper;
            _articleService = articleService;
            _imageService = imageService;
        }

        [HttpGet("{id}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task<ActionResult<ArticleInfoModel>> GetItemByIdAsync([BindRequired, FromRoute] Guid id)
        {
            //Require.Strings.NotNullOrWhiteSpace(id, nameof(id));

            return await GetItemAsync<ArticleDto, ArticleInfoModel>(_articleService, id, _mapper);
        }

        [HttpGet]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task<ActionResult<CollectionSegmentApiResponse<ArticleInfoModel>>> GetAsync([FromQuery]ApiQueryRequest queryRequest)
        {
            return await GetCollectionAsync<ArticleDto, ArticleInfoModel>(_articleService, queryRequest, _mapper);
        }

        [HttpPost]
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        public async Task<ActionResult<ArticleInfoModel>> CreateItemAsync([FromForm] ArticleCreateModel storyCreateModel)
        {
            return await CreatedItemAsync<ArticleDto, ArticleCreateModel, ArticleInfoModel>(_articleService, _imageService, storyCreateModel, storyCreateModel.Images, _mapper);
        }

        [HttpPut("{id}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task UpdateAsync([BindRequired, FromRoute] Guid id, [FromForm] ArticleUpdateModel storyUpdateModel)
        {
            await UpdateDataAsync(_articleService, _imageService, id, storyUpdateModel, storyUpdateModel.Images, _mapper);
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task DeleteAsync([BindRequired, FromRoute] Guid id)
        {
            await _articleService.DeleteAsync(id);
        }
    }
}
