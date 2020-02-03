using AnimalRescue.BusinessLogic.Extensions;
using AnimalRescue.Contracts.BusinessLogic.Interfaces;
using AnimalRescue.Contracts.BusinessLogic.Models;
using AnimalRescue.Contracts.Common.Query;
using AnimalRescue.DataAccess.Mongodb.Exceptions;
using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Models;
using AnimalRescue.Infrastructure.Validation;

using AutoMapper;

using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AnimalRescue.BusinessLogic.Services
{
    internal class EmployeeService : IEmployeeService
    {
        private readonly IEmployeeRepository _employeeRepository;
        private readonly IMapper _mapper;

        public EmployeeService(IEmployeeRepository employeeRepository, IMapper mapper)
        {
            Require.Objects.NotNull(employeeRepository, nameof(employeeRepository));
            Require.Objects.NotNull(mapper, nameof(mapper));

            _employeeRepository = employeeRepository;
            _mapper = mapper;
        }

        public async Task<EmployeeDto> CreateAsync(EmployeeDto employeeDto)
        {
            employeeDto.Id = Guid.Empty;

            var employee = _mapper.Map<EmployeeDto, Employee>(employeeDto);
            employee = await _employeeRepository.CreateAsync(employee);
            employeeDto = _mapper.Map<Employee, EmployeeDto>(employee);

            return employeeDto;
        }

        public async Task<BlCollectonResponse<EmployeeDto>> GetAsync(ApiQueryRequest queryRequest)
        {
            var dbQuery = queryRequest.ToDbQuery();

            var employees = await _employeeRepository.GetAsync(dbQuery);
            var employeeDtos = _mapper.Map<List<Employee>, List<EmployeeDto>>(employees);
            var count = await _employeeRepository.GetCountAsync(dbQuery);

            return new BlCollectonResponse<EmployeeDto>
            {
                Collection = employeeDtos,
                TotalCount = count
            };
        }

        public async Task<EmployeeDto> GetAsync(Guid id)
        {
            var employee = await _employeeRepository.GetAsync(id.AsObjectIdString());
            var employeeDto = _mapper.Map<Employee, EmployeeDto>(employee);

            return employeeDto;
        }

        public async Task UpdateAsync(EmployeeDto employeeDto)
        {
            var employee = _mapper.Map<EmployeeDto, Employee>(employeeDto);

            await _employeeRepository.UpdateAsync(employee);
        }

        public async Task DeleteAsync(Guid id)
        {
            await _employeeRepository.DeleteAsync(id.AsObjectIdString());
        }
    }
}
