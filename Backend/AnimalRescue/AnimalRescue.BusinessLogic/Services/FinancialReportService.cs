using AnimalRescue.BusinessLogic.Extensions;
using AnimalRescue.Contracts.BusinessLogic.Interfaces;
using AnimalRescue.Contracts.BusinessLogic.Models;
using AnimalRescue.Contracts.Common.Query;
using AnimalRescue.DataAccess.Mongodb.Exceptions;
using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Models;

using AutoMapper;

using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AnimalRescue.BusinessLogic.Services
{
    internal class FinancialReportService: IFinancialReportService
    {
        private readonly IFinancialReportRepository _financialReportRepository;

        private readonly IMapper _mapper;

        public FinancialReportService(
            IFinancialReportRepository financialReportRepository,
            IMapper mapper)
        {
            _financialReportRepository = financialReportRepository;
            _mapper = mapper;
        }

        public async Task<FinancialReportDto> GetAsync(Guid id)
        {
            var financialReport = await _financialReportRepository.GetAsync(id.AsObjectIdString());
            var financialReportDto = _mapper.Map<FinancialReport, FinancialReportDto>(financialReport);

            return financialReportDto;
        }

        public async Task<BlCollectonResponse<FinancialReportDto>> GetAsync(ApiQueryRequest queryRequest)
        {
            var dbQuery = queryRequest.ToDbQuery();
            var animals = await _financialReportRepository.GetAsync(dbQuery);
            var result = _mapper.Map<List<FinancialReport>, List<FinancialReportDto>>(animals);
            var count = await _financialReportRepository.GetCountAsync(dbQuery);

            return new BlCollectonResponse<FinancialReportDto>
            {
                Collection = result,
                TotalCount = count
            };
        }

        public async Task<FinancialReportDto> CreateAsync(FinancialReportDto financialReportDto)
        {
            var financialReport = _mapper.Map<FinancialReportDto, FinancialReport>(financialReportDto);
            financialReport = await _financialReportRepository.CreateAsync(financialReport);
            financialReportDto = _mapper.Map<FinancialReport, FinancialReportDto>(financialReport);

            return financialReportDto;
        }

        public async Task UpdateAsync(FinancialReportDto financialReportDto)
        {
            var financialReport = _mapper.Map<FinancialReportDto, FinancialReport>(financialReportDto);

            await _financialReportRepository.UpdateAsync(financialReport);
        }

        public async Task DeleteAsync(Guid id)
        {
            await _financialReportRepository.DeleteAsync(id.AsObjectIdString());
        }
    }
}
