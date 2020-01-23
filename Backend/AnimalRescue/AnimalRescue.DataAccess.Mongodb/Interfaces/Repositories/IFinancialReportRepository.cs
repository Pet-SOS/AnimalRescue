using AnimalRescue.Contracts.Common.Interfaces.CRUD;
using AnimalRescue.DataAccess.Mongodb.Models;
using AnimalRescue.DataAccess.Mongodb.Query;

using System.Collections.Generic;

namespace AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories
{
    public interface IFinancialReportRepository :
        IBaseQuerAsyncy<FinancialReport, string>,
        IBaseCreateAsync<FinancialReport>, 
        IBaseCountQueryAsync<DbQuery>,  
        IBaseUpdateAsync<FinancialReport>, 
        IBaseQuerAsyncy<List<FinancialReport>, DbQuery>,  
        IBaseDeleteAsync<string>
    {
    }
}
