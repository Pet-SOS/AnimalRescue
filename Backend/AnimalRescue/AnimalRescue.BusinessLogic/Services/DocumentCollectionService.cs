using AnimalRescue.Contracts.BusinessLogic.Interfaces;
using AnimalRescue.DataAccess.Mongodb.Extensions;
using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Models;
using AnimalRescue.Infrastructure.Validation;

using System;
using System.Threading.Tasks;

namespace AnimalRescue.BusinessLogic.Services
{
    internal class DocumentCollectionService : IDocumentCollectionService
    {
        private readonly IBaseRepository<DocumentCollection> _repository;

        public DocumentCollectionService(IBaseRepository<DocumentCollection> repository)
        {
            Require.Objects.NotNull(repository, nameof(repository));

            _repository = repository;
        }
        public async Task<Guid?> GetAsync(Guid id, string name)
        {
            var documentCollection = await _repository.GetAsync(id.AsObjectIdString());

            return documentCollection != null && documentCollection.TypeNameToDocumentId.TryGetValue(name.ToLower(), out string data) 
                ? data.AsGuid() 
                : (Guid?)null;
        }
    }
}
