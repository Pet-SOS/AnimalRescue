using AnimalRescue.API.Core.Responses;
using AnimalRescue.API.Models.Vacancies;
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
    [Authorize("Bearer")]
    public class VacanciesController : ApiControllerBase
    {
        private readonly ILogger<VacanciesController> _logger;
        private readonly IBlFullCrud<VacancyDto, VacancyDto, Guid> _vacancyService;
        public readonly IMapper _mapper;

        public VacanciesController(
            ILogger<VacanciesController> logger,
            IMapper mapper,
            IBlFullCrud<VacancyDto, VacancyDto, Guid> vacancyService)
        {
            Require.Objects.NotNull(logger, nameof(logger));
            Require.Objects.NotNull(mapper, nameof(mapper));
            Require.Objects.NotNull(vacancyService, nameof(vacancyService));

            _logger = logger;
            _mapper = mapper;
            _vacancyService = vacancyService;
        }

        [HttpGet("{id}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task<ActionResult<VacancyModel>> GetItemByIdAsync([BindRequired, FromRoute] Guid id)
        {
            return await GetItemAsync<VacancyDto, VacancyModel, Guid>(_vacancyService, id, _mapper);
        }

        [HttpGet]
        [AllowAnonymous]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task<ActionResult<CollectionSegmentApiResponse<VacancyModel>>> GetAsync([FromQuery]ApiQueryRequest queryRequest)
        {
            return await GetCollectionAsync<VacancyDto, VacancyModel>(_vacancyService, queryRequest, _mapper);
        }

        [HttpPost]
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        public async Task<ActionResult<VacancyModel>> CreateItemAsync([FromForm] VacancyCreateUpdateModel vacancyCreateUpdateModel)
        {
            return await CreatedItemAsync<VacancyDto, VacancyCreateUpdateModel, VacancyModel, Guid>(_vacancyService, vacancyCreateUpdateModel, _mapper);
        }

        [HttpPut("{id}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task UpdateAsync([BindRequired, FromRoute] Guid id, [FromForm] VacancyCreateUpdateModel vacancyCreateUpdateModel)
        {
            await UpdateDataAsync(_vacancyService, id, vacancyCreateUpdateModel, _mapper);
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task DeleteAsync([BindRequired, FromRoute] Guid id)
        {
            await _vacancyService.DeleteAsync(id);
        }
    }
}
