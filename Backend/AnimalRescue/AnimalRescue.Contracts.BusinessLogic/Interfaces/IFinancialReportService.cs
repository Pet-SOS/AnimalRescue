using AnimalRescue.Contracts.BusinessLogic.Models;

using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AnimalRescue.Contracts.BusinessLogic.Interfaces
{
    public interface IFinancialReportService : IBlFullCrud<FinancialReportDto, FinancialReportDto, Guid>
    {
        Task<List<FinancialReportByYearDto>> GetReportsByYearsAsync();
    }
}
