using AnimalRescue.API.Core.Responses;
using AnimalRescue.API.Models.History;
using AnimalRescue.Contracts.BusinessLogic.Interfaces;
using AnimalRescue.Contracts.BusinessLogic.Models.History;
using AnimalRescue.Contracts.Common.Query;
using AnimalRescue.Infrastructure.Validation;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using System.Threading.Tasks;

namespace AnimalRescue.API.Controllers
{
    public class HistoryController : ApiControllerBase
    {
        private readonly IBlFullCrud<HistoryDto, HistoryDto, string> service;
        private readonly IMapper mapper;

        public HistoryController(IMapper mapper, IBlFullCrud<HistoryDto, HistoryDto, string> service)
        {
            Require.Objects.NotNull(mapper, nameof(mapper));
            Require.Objects.NotNull(service, nameof(service));

            this.mapper = mapper;
            this.service = service;
        }
        [HttpGet("{id}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task<ActionResult<HistoryModel>> GetItemByIdAsync([BindRequired, FromRoute] string id)
        {
            return await GetItemAsync<HistoryDto, HistoryModel, string>(service, id, mapper);
        }

        [HttpGet]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task<ActionResult<CollectionSegmentApiResponse<HistoryModel>>> GetAsync([FromQuery]ApiQueryRequest queryRequest)
        {
            return await GetCollectionAsync<HistoryDto, HistoryModel>(service, queryRequest, mapper);
        }
    }
}
