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
    internal class DocumentCollectionRepository : IDocumentCollectionRepository
    {
        private readonly IBaseCollection<DocumentCollection> _baseCollection;

        public DocumentCollectionRepository(IBaseCollection<DocumentCollection> baseCollection)
        {
            _baseCollection = baseCollection;
        }

        public async Task<DocumentCollection> GetAsync(string id)
        {
            var result = await _baseCollection.GetAsync(id);

            return result;
        }

        public async Task<DocumentCollection> CreateAsync(DocumentCollection item)
        {
            item.Id = string.Empty;
            item.CreatedAt = DateTime.Now;
            item = await _baseCollection.CreateAsync(item);

            return item;
        }

        public async Task UpdateAsync(DocumentCollection item)
        {
            var newData = item;
            var oldData = await _baseCollection.GetAsync(item.Id);
            Require.Objects.NotNull<NotFoundException>(
                oldData, 
                () => $"FinancialReport with id: {item.Id} not found");

            await _baseCollection.UpdateAsync(newData);
        }

        public async Task DeleteAsync(string id)
        {
            await _baseCollection.DeleteAsync(id);
        }

        public async Task<int> GetCountAsync(DbQuery query)
        {
            var result = await _baseCollection.GetCountAsync(query);

            return result;
        }

        public async Task<List<DocumentCollection>> GetAsync(DbQuery query)
        {
            var result = await _baseCollection.GetAsync(query);

            return result;
        }
    }
}
