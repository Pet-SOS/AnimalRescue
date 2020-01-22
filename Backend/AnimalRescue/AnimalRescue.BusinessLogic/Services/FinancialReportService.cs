using AnimalRescue.Contracts.BusinessLogic.Interfaces;
using AnimalRescue.Contracts.BusinessLogic.Models;
using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Models;
using AutoMapper;
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

        public async Task<FinancialReportDto> GetAsync(string financialReportId)
        {
            var financialReport = await _financialReportRepository.GetAsync(financialReportId);
            var financialReportDto = _mapper.Map<FinancialReport, FinancialReportDto>(financialReport);

            return financialReportDto;
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

        public async Task DeleteAsync(string financialReportId)
        {
            await _financialReportRepository.DeleteAsync(financialReportId);
        }
    }
}
