using AnimalRescue.Contracts.BusinessLogic.Interfaces.CRUD;
using AnimalRescue.Contracts.BusinessLogic.Models;

namespace AnimalRescue.Contracts.BusinessLogic.Interfaces
{
    public interface IEmployeeService :
        IBlCollectinQueryAsync<EmployeeDto>,
        IBlOneItemQueryAsync<EmployeeDto>,
        IBlCreateAsync<EmployeeDto, EmployeeDto>,
        IBlUpdateAsync<EmployeeDto>,
        IBlDeleteAsync
    {
    }
}
