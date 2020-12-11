using AnimalRescue.DataAccess.Mongodb.Interfaces;
using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Models;
using System.Threading.Tasks;
using MongoDB.Driver;

namespace AnimalRescue.DataAccess.Mongodb.Repositories
{
    internal class FinancialReportYearInfoRepository : BaseRepository<FinancialReportYearInfo>, IFinancialReportYearInfoRepository
    {
        public FinancialReportYearInfoRepository(IBaseCollection<FinancialReportYearInfo> baseCollection) : base(baseCollection)
        {
        }
        public async Task<FinancialReportYearInfo> GetFinancialReportInfoByYearAsync(int year)
        {
            var sort = Builders<FinancialReportYearInfo>.Sort.Descending(item => item.CreatedAt);
            return (await baseCollection.Collection.FindAsync(item => item.Year == year, new FindOptions<FinancialReportYearInfo, FinancialReportYearInfo>()
            {
                Sort = sort
            })).FirstOrDefault();           
        }
    }
}
