using AnimalRescue.Contracts.BusinessLogic.Interfaces.CRUD;
using AnimalRescue.Contracts.BusinessLogic.Models;

namespace AnimalRescue.Contracts.BusinessLogic.Interfaces
{
    public interface IEmployeeService :
        IBlCollectinQueryAsyncy<EmployeeDto>,
        IBlOneItemQueryAsyncy<EmployeeDto>,
        IBlCreateAsync<EmployeeDto, EmployeeDto>,
        IBlUpdateAsync<EmployeeDto>,
        IBlDeleteAsync
    {
    }
}
