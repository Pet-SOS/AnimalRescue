using AnimalRescue.Contracts.BusinessLogic.Interfaces;
using AnimalRescue.Contracts.BusinessLogic.Models;
using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Models;

using AutoMapper;

namespace AnimalRescue.BusinessLogic.Services
{
    internal class FinancialReportService : BaseService<FinancialReportDto, FinancialReport>, IFinancialReportService
    {
        private readonly IFinancialReportRepository _financialReportRepository;
        private readonly IMapper _mapper;

        public FinancialReportService(IFinancialReportRepository repository, IMapper mapper) 
            : base(repository, mapper)
        {
            _financialReportRepository = repository;
            _mapper = mapper;
        }  
    }
}
