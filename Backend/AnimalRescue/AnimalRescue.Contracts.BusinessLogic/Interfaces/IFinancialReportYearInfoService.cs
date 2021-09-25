using AnimalRescue.Contracts.BusinessLogic.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace AnimalRescue.Contracts.BusinessLogic.Interfaces
{
    public interface IFinancialReportYearInfoService : IBlFullCrud<FinancialReportYearInfoDto, FinancialReportYearInfoDto, Guid>
    {
        Task<FinancialReportYearInfoDto> GetFinancialReportInfoByYear(int year);
    }
}
