using AnimalRescue.Contracts.BusinessLogic.Interfaces.CRUD;
using AnimalRescue.Contracts.BusinessLogic.Models;

namespace AnimalRescue.Contracts.BusinessLogic.Interfaces
{
    public interface IFinancialReportService :
        IBlOneItemQueryAsyncy<FinancialReportDto>,
        IBlCreateAsync<FinancialReportDto, FinancialReportDto>,
        IBlUpdateAsync<FinancialReportDto>,
        IBlDeleteAsync
    {
    }
}
