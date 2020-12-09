using AnimalRescue.Contracts.BusinessLogic.Interfaces;
using AnimalRescue.Contracts.BusinessLogic.Models;
using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Models;
using AnimalRescue.DataAccess.Mongodb.Query;
using AnimalRescue.DataAccess.Mongodb.QueryBuilders;
using AutoMapper;
using System;
using System.Linq;
using System.Threading.Tasks;


using baseItem = AnimalRescue.Contracts.Common.Constants.PropertyConstants.BaseItem;

namespace AnimalRescue.BusinessLogic.Services
{
    internal class FinancialReportYearInfoService : 
        BaseService<FinancialReportYearInfoDto, FinancialReportYearInfo, Guid>, IFinancialReportYearInfoService
    {
        public FinancialReportYearInfoService(
            IBaseRepository<FinancialReportYearInfo> financialReportYearInfoRepository, 
            IRecoverDataService recoverDataService,
            IMapper mapper)
            :base(financialReportYearInfoRepository, recoverDataService, mapper)
        {
        }

        public async Task<FinancialReportYearInfoDto> GetFinancialReportInfoByYear(int year)
        {
            var filter = $"year~{StrictFilterContractConstants.Eq}~{year};{baseItem.IsDeleted}~{StrictFilterContractConstants.Eq}~'false'";
            DbQuery dbQuery = new DbQuery
            {
                Filter = filter,
                Page = 1,
                Size = 1
            };

            var financialReportYearInfoList = await _repository.GetAsync(dbQuery);
            FinancialReportYearInfoDto dataDto = _mapper.Map<FinancialReportYearInfo, FinancialReportYearInfoDto>(financialReportYearInfoList.FirstOrDefault());

            return dataDto;
        }
    }
}
