using AnimalRescue.Contracts.BusinessLogic.Interfaces;
using AnimalRescue.Contracts.BusinessLogic.Models;
using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Models;

using AutoMapper;

namespace AnimalRescue.BusinessLogic.Services
{
    internal class EmployeeService : BaseService<EmployeeDto, Employee>, IBlFullCrud<EmployeeDto, EmployeeDto>
    {
        public EmployeeService(IEmployeeRepository repository, IMapper mapper) 
            : base(repository, mapper)
        {
        }  
    }
}
