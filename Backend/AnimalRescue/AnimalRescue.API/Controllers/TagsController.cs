using AnimalRescue.API.Core.Responses;
using AnimalRescue.API.Models.Tags;
using AnimalRescue.Contracts.BusinessLogic.Interfaces;
using AnimalRescue.Contracts.BusinessLogic.Models;
using AnimalRescue.Contracts.Common.Query;
using AnimalRescue.Infrastructure.Validation;

using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.Extensions.Logging;

using System;
using System.Threading.Tasks;

namespace AnimalRescue.API.Controllers
{
    [Authorize]
    public class TagsController : ApiControllerBase
    {
        private readonly ITagService _tagService;

        private readonly ILogger<TagsController> _logger;

        private readonly IMapper _mapper;

        public TagsController(
            ITagService tagService,
            ILogger<TagsController> logger,
            IMapper mapper)
        {
            Require.Objects.NotNull(tagService, nameof(tagService));
            Require.Objects.NotNull(logger, nameof(logger));
            Require.Objects.NotNull(mapper, nameof(mapper));

            _tagService = tagService;
            _logger = logger;
            _mapper = mapper;
        }

        [HttpGet("{id}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task<ActionResult<TagModel>> GetItemByIdAsync([BindRequired, FromRoute] Guid id)
        {
            return await GetItemAsync<TagDto, TagModel>(_tagService, id, _mapper);
        }

        [HttpGet]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task<ActionResult<CollectionSegmentApiResponse<TagModel>>> GetAsync([FromQuery]ApiQueryRequest queryRequest)
        {
            return await GetCollectionAsync<TagDto, TagModel>(_tagService, queryRequest, _mapper);
        }

        [HttpPost]
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        public async Task<ActionResult<TagModel>> CreateItemAsync([FromForm] TagCreateUpdateModel tagCreateModel)
        {
            return await CreatedItemAsync<TagDto,TagCreateUpdateModel,TagModel>(_tagService, tagCreateModel, _mapper);
        }

        [HttpPut("{id}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task UpdateAsync([BindRequired, FromRoute] Guid id, [FromForm] TagCreateUpdateModel tagUpdateModel)
        {
            await UpdateDataAsync(_tagService, id, tagUpdateModel, _mapper);
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task DeleteAsync([BindRequired, FromRoute] Guid id)
        {
            await _tagService.DeleteAsync(id);
        }
    }
}