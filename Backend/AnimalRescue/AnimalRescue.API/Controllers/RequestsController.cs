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
using System.Collections.Generic;

namespace AnimalRescue.API.Controllers
{
    [Authorize("Bearer")]
    public class RequestsController : ApiControllerBase
    {
        private readonly ILogger<RequestsController> _logger;
        private readonly IRequestService _requestService;
        public readonly IMapper _mapper;

        public RequestsController(
            ILogger<RequestsController> logger,
            IMapper mapper,
            IRequestService requestService)
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
            var roles = GetUserRoles();
            var data = await _requestService.GetAsync(id, roles);
            var result = _mapper.Map<RequestModel>(data);
            return Item(result);
        }

        [HttpGet]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task<ActionResult<CollectionSegmentApiResponse<RequestModel>>> GetAsync([FromQuery]ApiQueryRequest queryRequest)
        {
            var roles = GetUserRoles();
            var serviceResponse = await _requestService.GetAsync(queryRequest, roles);
            List<RequestModel> result = _mapper.Map<List<RequestDto>, List<RequestModel>>(serviceResponse.Collection);
            return Collection(result, serviceResponse.TotalCount, queryRequest.Page, queryRequest.Size);
        }

        [HttpPost]
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        public async Task<ActionResult<RequestModel>> CreateItemAsync([FromForm] RequestCreateUpdateModel requestCreateUpdateModel)
        {
            var roles = GetUserRoles();
            RequestDto itemDto = _mapper.Map<RequestCreateUpdateModel, RequestDto>(requestCreateUpdateModel);
            itemDto = await _requestService.CreateAsync(itemDto, roles);
            var itemModel = _mapper.Map<RequestDto, RequestModel>(itemDto);
            return CreatedItem<RequestModel, Guid>(itemModel);
        }

        [HttpPut("{id}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task UpdateAsync([BindRequired, FromRoute] Guid id, [FromForm] RequestCreateUpdateModel requestCreateUpdateModel)
        {
            var roles = GetUserRoles();
            var itemDto = _mapper.Map<RequestCreateUpdateModel, RequestDto>(requestCreateUpdateModel);
            itemDto.Id = id;
            await _requestService.UpdateAsync(itemDto, roles);
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
