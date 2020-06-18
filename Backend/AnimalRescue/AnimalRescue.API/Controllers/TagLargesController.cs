using AnimalRescue.API.Core.Responses;
using AnimalRescue.API.Models.Tags;
using AnimalRescue.Contracts.BusinessLogic.Interfaces;
using AnimalRescue.Contracts.BusinessLogic.Models.Tag;
using AnimalRescue.Contracts.Common.Query;
using AnimalRescue.Infrastructure.Validation;

using AutoMapper;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.Extensions.Logging;

using System.Threading.Tasks;

namespace AnimalRescue.API.Controllers
{
    [Authorize("Bearer")]
    public class TagLargesController : ApiControllerBase
    {
        private readonly ITagLargeService _tagService;

        private readonly ILogger<TagLargesController> _logger;

        private readonly IMapper _mapper;

        public TagLargesController(
            ITagLargeService tagService,
            ILogger<TagLargesController> logger,
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
        [AllowAnonymous]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task<ActionResult<TagLargeModel>> GetItemByIdAsync([BindRequired, FromRoute] string id)
        {
            return await GetItemAsync<TagLargeDto, TagLargeModel, string>(_tagService, id, _mapper);
        }

        [HttpGet]
        [AllowAnonymous]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task<ActionResult<CollectionSegmentApiResponse<TagLargeModel>>> GetAsync([FromQuery]ApiQueryRequest queryRequest)
        {
            return await GetCollectionAsync<TagLargeDto, TagLargeModel>(_tagService, queryRequest, _mapper);
        }

        [HttpPost]
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        public async Task<ActionResult<TagLargeModel>> CreateItemAsync([FromBody] TagLargeCreateUpdateModel tagCreateModel)
        {
            return await CreatedItemAsync<TagLargeDto, TagLargeCreateUpdateModel, TagLargeModel, string>(_tagService, tagCreateModel, _mapper);
        }

        [HttpPut("{id}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task UpdateAsync([BindRequired, FromRoute] string id, [FromBody] TagLargeCreateUpdateModel tagUpdateModel)
        {
            await UpdateDataAsync(_tagService, id, tagUpdateModel, _mapper);
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task DeleteAsync([BindRequired, FromRoute] string id)
        {
            await _tagService.DeleteAsync(id);
        }
    }
}