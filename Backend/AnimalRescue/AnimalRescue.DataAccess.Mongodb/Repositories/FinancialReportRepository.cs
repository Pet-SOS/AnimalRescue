using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Models;
using AnimalRescue.DataAccess.Mongodb.QueryBuilders;

using MongoDB.Driver;

namespace AnimalRescue.DataAccess.Mongodb.Repositories
{
    internal class FinancialReportRepository :
        BaseCollection<FinancialReport>,      
        IFinancialReportRepository
    {
        public FinancialReportRepository(IMongoDatabase database, IQueryBuilder<FinancialReport> builder) : base(database, builder)
        {
        }
    }
}
