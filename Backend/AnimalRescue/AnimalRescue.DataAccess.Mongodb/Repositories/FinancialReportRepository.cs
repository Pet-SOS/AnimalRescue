using AnimalRescue.Contracts.Common.Exceptions;
using AnimalRescue.DataAccess.Mongodb.Interfaces;
using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Models;
using AnimalRescue.DataAccess.Mongodb.Query;
using AnimalRescue.Infrastructure.Validation;

using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AnimalRescue.DataAccess.Mongodb.Repositories
{
    internal class FinancialReportRepository: IFinancialReportRepository
    {
        private readonly IBaseCollection<FinancialReport> _baseCollection;

        public FinancialReportRepository(IBaseCollection<FinancialReport> baseCollection)
        {
            _baseCollection = baseCollection;
        }

        public async Task<FinancialReport> GetAsync(string financialReportId)
        {
            var result = await _baseCollection.GetAsync(financialReportId);

            return result;
        }

        public async Task<FinancialReport> CreateAsync(FinancialReport financialReport)
        {
            financialReport.Id = string.Empty;
            financialReport.CreatedAt = DateTime.Now;
            financialReport = await _baseCollection.CreateAsync(financialReport);

            return financialReport;
        }

        public async Task UpdateAsync(FinancialReport financialReport)
        {
            var newData = financialReport;
            var oldData = await _baseCollection.GetAsync(financialReport.Id);
            Require.Objects.NotNull<NotFoundException>(oldData, () => $"FinancialReport with id: {financialReport.Id} not found");

            await _baseCollection.UpdateAsync(newData);
        }

        public async Task DeleteAsync(string financialReportId)
        {
            await _baseCollection.RemoveAsync(financialReportId);
        }

        public async Task<int> GetCountAsync(DbQuery query)
        {
            var result = await _baseCollection.GetCountAsync(query);

            return result;
        }

        public async Task<List<FinancialReport>> GetAsync(DbQuery query)
        {
            var result = await _baseCollection.GetAsync(query);

            return result;
        }
    }
}
