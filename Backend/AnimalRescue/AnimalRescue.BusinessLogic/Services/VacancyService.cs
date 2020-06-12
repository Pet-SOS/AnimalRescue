using AnimalRescue.Contracts.BusinessLogic.Interfaces;
using AnimalRescue.Contracts.BusinessLogic.Models;
using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Models;

using AutoMapper;

using System;

namespace AnimalRescue.BusinessLogic.Services
{
    internal class VacancyService :
        BaseService<VacancyDto, Vacancy, Guid>, 
        IBlFullCrud<VacancyDto, VacancyDto, Guid>
    {
        public VacancyService(
            IVacancyRepository repository,
            IRecoverDataService recoverDataService,
            IMapper mapper)
            : base(repository, recoverDataService, mapper)
        {
        }  
    }
}
