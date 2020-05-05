using AnimalRescue.Contracts.BusinessLogic.Interfaces.CRUD;
using AnimalRescue.Contracts.BusinessLogic.Models;

using System;

namespace AnimalRescue.Contracts.BusinessLogic.Interfaces
{
    public interface IRequestService :
        IBlCollectinQueryAsync<EmployeeDto>,
        IBlOneItemQueryAsync<EmployeeDto, Guid>,
        IBlCreateAsync<EmployeeDto, EmployeeDto>,
        IBlUpdateAsync<EmployeeDto>,
        IBlDeleteAsync<Guid>
    {
    }
}
