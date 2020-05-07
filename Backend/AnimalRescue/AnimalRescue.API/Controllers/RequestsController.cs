using AnimalRescue.API.Core.Responses;
using AnimalRescue.API.Models.Requests;
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
//    [Authorize("Bearer")]
    public class RequestsController : ApiControllerBase
    {
        private readonly ILogger<RequestsController> _logger;
        private readonly IBlFullCrud<RequestDto, RequestDto, Guid> _requestService;
        public readonly IMapper _mapper;

        public RequestsController(
            ILogger<RequestsController> logger,
            IMapper mapper,
            IBlFullCrud<RequestDto, RequestDto, Guid> requestService)
        {
            Require.Objects.NotNull(logger, nameof(logger));
            Require.Objects.NotNull(mapper, nameof(mapper));
            Require.Objects.NotNull(requestService, nameof(requestService));

            _logger = logger;
            _mapper = mapper;
            _requestService = requestService;
        }

        [HttpGet("{id}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task<ActionResult<RequestModel>> GetItemByIdAsync([BindRequired, FromRoute] Guid id)
        {
            return await GetItemAsync<RequestDto, RequestModel, Guid>(_requestService, id, _mapper);
        }

        [HttpGet]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task<ActionResult<CollectionSegmentApiResponse<RequestModel>>> GetAsync([FromQuery]ApiQueryRequest queryRequest)
        {
            return await GetCollectionAsync<RequestDto, RequestModel>(_requestService, queryRequest, _mapper);
        }

        [HttpPost]
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        public async Task<ActionResult<RequestModel>> CreateItemAsync([FromForm] RequestCreateUpdateModel requestCreateUpdateModel)
        {
            return await CreatedItemAsync<RequestDto, RequestCreateUpdateModel, RequestModel, Guid>(_requestService, requestCreateUpdateModel, _mapper);
        }

        [HttpPut("{id}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task UpdateAsync([BindRequired, FromRoute] Guid id, [FromForm] RequestCreateUpdateModel requestCreateUpdateModel)
        {
            await UpdateDataAsync(_requestService, id, requestCreateUpdateModel, _mapper);
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task DeleteAsync([BindRequired, FromRoute] Guid id)
        {
            await _requestService.DeleteAsync(id);
        }
    }
}
