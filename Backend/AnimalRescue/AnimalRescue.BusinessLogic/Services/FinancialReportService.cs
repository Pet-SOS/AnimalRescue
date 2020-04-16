using AnimalRescue.BusinessLogic.Extensions;
using AnimalRescue.Contracts.BusinessLogic.Interfaces;
using AnimalRescue.Contracts.BusinessLogic.Models;
using AnimalRescue.Contracts.Common.Query;
using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Models;

using AutoMapper;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AnimalRescue.BusinessLogic.Services
{
    internal class FinancialReportService : BaseService<FinancialReportDto, FinancialReport, Guid>, IFinancialReportService
    {
        private readonly IFinancialReportRepository _financialReportRepository;
        private readonly IMapper _mapper;

        public FinancialReportService(IFinancialReportRepository repository, IMapper mapper)
            : base(repository, mapper)
        {
            _financialReportRepository = repository;
            _mapper = mapper;
        }

        public async Task<List<FinancialReportByYearDto>> GetReportsByYearsAsync()
        {
            var data = await _financialReportRepository.GetAsync(new ApiQueryRequest { Size = int.MaxValue }.ToDbQuery());
            var result = data
                .Select(x => new { x.Date.Year, report = x })
                .GroupBy(x => x.Year)
                .Select(x => new FinancialReportByYearDto
                {
                    Date = x.Key,
                    Reports = x.Select(x => _mapper.Map<FinancialReportDto>(x.report)).ToList()
                })
                .ToList();

            return result;
        }
    }
}
