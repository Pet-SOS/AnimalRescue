using System;
using AnimalRescue.Contracts.BusinessLogic.Interfaces;
using AnimalRescue.Contracts.BusinessLogic.Models.History;
using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Models.History;
using AutoMapper;

namespace AnimalRescue.BusinessLogic.Services
{
    internal class HistoryService : BaseService<HistoryDto, History, Guid>
    {
        public HistoryService(IBaseRepository<History> repository, IRecoverDataService recoverDataService, IMapper mapper) : base(repository, recoverDataService, mapper)
        {
        }
    }
}
