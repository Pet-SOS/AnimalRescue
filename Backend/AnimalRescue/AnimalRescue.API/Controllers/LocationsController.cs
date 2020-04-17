using AnimalRescue.API.Core.Responses;
using AnimalRescue.API.Models.Locations;
using AnimalRescue.Contracts.BusinessLogic.Interfaces;
using AnimalRescue.Contracts.BusinessLogic.Models;
using AnimalRescue.Contracts.Common.Query;
using AnimalRescue.Infrastructure.Validation;

using AutoMapper;

using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;

using System;
using System.Threading.Tasks;

namespace AnimalRescue.API.Controllers
{
    public class LocationsController : ApiControllerBase
    {
        private readonly ILocationService _locationService;
        private readonly IMapper _mapper;

        public LocationsController(
            IMapper mapper,
            ILocationService locationService)
        {
            Require.Objects.NotNull(mapper, nameof(mapper));
            Require.Objects.NotNull(locationService, nameof(locationService));

            _mapper = mapper;
            this._locationService = locationService;
        }

        [HttpGet("{id}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task<ActionResult<LocationModel>> GetItemByIdAsync([BindRequired, FromRoute] Guid id)
        {
            return await GetItemAsync<LocationDto, LocationModel, Guid>(_locationService, id, _mapper);
        }

        [HttpGet]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task<ActionResult<CollectionSegmentApiResponse<LocationModel>>> GetAsync([FromQuery]ApiQueryRequest queryRequest)
        {
            return await GetCollectionAsync<LocationDto, LocationModel>(_locationService, queryRequest, _mapper);
        }

        /// <summary>
        /// Create an animal
        /// </summary>
        /// <param name="createModel"></param>
        /// <returns></returns>
        [HttpPost]
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        public async Task<ActionResult<LocationModel>> CreateItemAsync([FromForm] LocationCreateUpdateModel createModel)
        {
            var model = _mapper.Map<LocationCreateUpdateModel, LocationModel>(createModel);
            return await CreatedItemAsync<LocationDto, LocationModel, Guid>(_locationService, model, _mapper);
        }

        [HttpPut("{id}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task UpdateAsync([BindRequired, FromRoute] Guid id, [FromForm] LocationCreateUpdateModel animalUpdateModel)
        {
            var animalModel = _mapper.Map<LocationCreateUpdateModel, LocationModel>(animalUpdateModel);
            animalModel.Id = id;
            await UpdateDataAsync(_locationService, id, animalModel, _mapper);
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task DeleteAsync([BindRequired, FromRoute] Guid id)
        {
            await _locationService.DeleteAsync(id);
        }
    }
}