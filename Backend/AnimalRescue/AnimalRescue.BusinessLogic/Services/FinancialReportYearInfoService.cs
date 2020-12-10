using AnimalRescue.Contracts.BusinessLogic.Interfaces;
using AnimalRescue.Contracts.BusinessLogic.Models;
using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Models;
using AutoMapper;
using System;
using System.Threading.Tasks;


namespace AnimalRescue.BusinessLogic.Services
{
    internal class FinancialReportYearInfoService : 
        BaseService<FinancialReportYearInfoDto, FinancialReportYearInfo, Guid>, IFinancialReportYearInfoService
    {
        private readonly IFinancialReportYearInfoRepository _financialReportYearInfoRepository;
        public FinancialReportYearInfoService(
            IFinancialReportYearInfoRepository financialReportYearInfoRepository, 
            IRecoverDataService recoverDataService,
            IMapper mapper)
            :base(financialReportYearInfoRepository, recoverDataService, mapper)
        {
            _financialReportYearInfoRepository = financialReportYearInfoRepository;
        }

        public async Task<FinancialReportYearInfoDto> GetFinancialReportInfoByYear(int year)
        {
            var financialReportYearInfo = await _financialReportYearInfoRepository.GetFinancialReportInfoByYearAsync(year);
            FinancialReportYearInfoDto dataDto = _mapper.Map<FinancialReportYearInfo, FinancialReportYearInfoDto>(financialReportYearInfo);

            return dataDto;
        }
    }
}
