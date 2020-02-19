using AnimalRescue.Contracts.BusinessLogic.Models;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace AnimalRescue.Contracts.BusinessLogic.Interfaces
{
    public interface IFinancialReportService : IBlFullCrud<FinancialReportDto, FinancialReportDto>
    {
        Task<List<FinancialReportByYearDto>> GetReportsByYearsAsync();
    }
}
