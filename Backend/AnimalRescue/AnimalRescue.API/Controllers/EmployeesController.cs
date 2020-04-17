using AnimalRescue.API.Core.Responses;
using AnimalRescue.API.Models.Employees;
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
    public class EmployeesController : ApiControllerBase
    {
        private readonly ILogger<EmployeesController> _logger;
        private readonly IBlFullCrud<EmployeeDto, EmployeeDto, Guid> _employeeService;
        public readonly IMapper _mapper;

        public EmployeesController(
            ILogger<EmployeesController> logger,
            IMapper mapper,
            IBlFullCrud<EmployeeDto, EmployeeDto, Guid> employeeService)
        {
            Require.Objects.NotNull(logger, nameof(logger));
            Require.Objects.NotNull(mapper, nameof(mapper));
            Require.Objects.NotNull(employeeService, nameof(employeeService));

            _logger = logger;
            _mapper = mapper;
            _employeeService = employeeService;
        }

        [HttpGet("{id}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task<ActionResult<EmployeeModel>> GetItemByIdAsync([BindRequired, FromRoute] Guid id)
        {
            return await GetItemAsync<EmployeeDto, EmployeeModel, Guid>(_employeeService, id, _mapper);
        }

        [HttpGet]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task<ActionResult<CollectionSegmentApiResponse<EmployeeModel>>> GetAsync([FromQuery]ApiQueryRequest queryRequest)
        {
            return await GetCollectionAsync<EmployeeDto, EmployeeModel>(_employeeService, queryRequest, _mapper);
        }

        [HttpPost]
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        public async Task<ActionResult<EmployeeModel>> CreateItemAsync([FromForm] EmployeeCreateUpdateModel employeeCreateUpdateModel)
        {
            return await CreatedItemAsync<EmployeeDto, EmployeeCreateUpdateModel, EmployeeModel, Guid>(_employeeService, employeeCreateUpdateModel, _mapper);
        }

        [HttpPut("{id}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task UpdateAsync([BindRequired, FromRoute] Guid id, [FromForm] EmployeeCreateUpdateModel employeeCreateUpdateModel)
        {
            await UpdateDataAsync(_employeeService, id, employeeCreateUpdateModel, _mapper);
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task DeleteAsync([BindRequired, FromRoute] Guid id)
        {
            await _employeeService.DeleteAsync(id);
        }
    }
}
