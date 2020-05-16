using AnimalRescue.BusinessLogic.Extensions;
using AnimalRescue.Contracts.Common.Query;
using AnimalRescue.DataAccess.Mongodb.Interfaces;
using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;

using System.Threading.Tasks;

using static AnimalRescue.DataAccess.Mongodb.QueryBuilders.StrictFilterContractConstants;

using common = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Common;

namespace AnimalRescue.BusinessLogic.Services
{
    public class UnlinkedFileSearchService
    {
        private readonly IBucket _bucket;
        private readonly IDocumentCollectionRepository _documentCollectionRepository;
        private readonly IAnimalRepository _animalRepository;

        public UnlinkedFileSearchService(
            IBucket bucket,
            IDocumentCollectionRepository documentCollectionRepository,
            IAnimalRepository animalRepository)
        {
            _bucket = bucket;
            _documentCollectionRepository = documentCollectionRepository;
            _animalRepository = animalRepository;
        }

        public async Task RunAsync()
        {
            await foreach (var documentCollectionItem in _documentCollectionRepository.GetAllItemsAsync())
            {
                var query = new  ApiQueryRequest
                {
                    Filter =$"{common.ImageIds}~{All}~{documentCollectionItem.Id}"
                };

               var animalItems = await _animalRepository.GetAsync(query.ToDbQuery());

               if (animalItems.Count == 0)
               {
                   foreach (var fileId in documentCollectionItem.TypeNameToDocumentId.Values)
                   {
                       await _bucket.RemoveFileAsync(fileId);
                   }

                   await _documentCollectionRepository.DeleteAsync(documentCollectionItem.Id);
               }
            }
        }
    }
}
