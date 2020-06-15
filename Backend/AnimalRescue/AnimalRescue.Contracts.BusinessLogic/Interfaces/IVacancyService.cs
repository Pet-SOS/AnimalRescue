using AnimalRescue.Contracts.BusinessLogic.Interfaces.CRUD;
using AnimalRescue.Contracts.BusinessLogic.Models;

using System;

namespace AnimalRescue.Contracts.BusinessLogic.Interfaces
{
    public interface IVacancyService :
        IBlCollectinQueryAsync<VacancyDto>,
        IBlOneItemQueryAsync<VacancyDto, Guid>,
        IBlCreateAsync<VacancyDto, VacancyDto>,
        IBlUpdateAsync<VacancyDto>,
        IBlDeleteAsync<Guid>
    {
    }
}
