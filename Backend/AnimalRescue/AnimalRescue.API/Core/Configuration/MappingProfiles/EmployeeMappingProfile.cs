using AnimalRescue.API.Models.Employees;
using AnimalRescue.Contracts.BusinessLogic.Models;
using AutoMapper;

namespace AnimalRescue.API.Core.Configuration.MappingProfiles
{
    public class EmployeeMappingProfile : Profile
    {
        public EmployeeMappingProfile()
        {
            CreateMap<EmployeeModel, EmployeeDto>();
            CreateMap<EmployeeDto, EmployeeModel>();
            CreateMap<EmployeeCreateUpdateModel, EmployeeModel>();
            CreateMap<EmployeeCreateUpdateModel, EmployeeDto>();
        }
    }
}
