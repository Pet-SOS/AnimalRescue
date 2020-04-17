using AnimalRescue.Contracts.BusinessLogic.Interfaces;
using AnimalRescue.Contracts.BusinessLogic.Models;
using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Models;

using AutoMapper;

using System;

namespace AnimalRescue.BusinessLogic.Services
{
    internal class EmployeeService :
        BaseService<EmployeeDto, Employee, Guid>, 
        IBlFullCrud<EmployeeDto, EmployeeDto, Guid>
    {
        public EmployeeService(
            IEmployeeRepository repository,
            IWellKnownTagRepository wellKnownTagRepository,
            IMapper mapper)
            : base(repository, wellKnownTagRepository, mapper)
        {
        }  
    }
}
