using AnimalRescue.Contracts.Common.Interfaces.CRUD;
using AnimalRescue.DataAccess.Mongodb.Models;

namespace AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories
{
    public interface IFinancialReportRepository :
        IBaseQuerAsyncy<FinancialReport, string>,
        IBaseCreateAsync<FinancialReport>,
        IBaseUpdateAsync<FinancialReport>,
        IBaseDeleteAsync<string>
    {
    }
}
