using AnimalRescue.BusinessLogic.Extensions;
using AnimalRescue.Contracts.Common.Query;
using AnimalRescue.DataAccess.Mongodb.Interfaces;
using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.Infrastructure.Validation;

using Microsoft.Extensions.Logging;

using System.Threading.Tasks;

using static AnimalRescue.DataAccess.Mongodb.QueryBuilders.StrictFilterContractConstants;

using common = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Common;

namespace AnimalRescue.BusinessLogic.Services
{
    public class UnlinkedFileSearchService
    {
        private readonly ILogger<UnlinkedFileSearchService> _logger;
        private readonly IBucket _bucket;
        private readonly IDocumentCollectionRepository _documentCollectionRepository;
        private readonly IAnimalRepository _animalRepository;
        private readonly IArticleRepository _articleRepository;

        public UnlinkedFileSearchService(
            ILogger<UnlinkedFileSearchService> logger,
            IBucket bucket,
            IDocumentCollectionRepository documentCollectionRepository,
            IAnimalRepository animalRepository,
            IArticleRepository articleRepository)
        {
            Require.Objects.NotNull(logger, nameof(logger));
            Require.Objects.NotNull(bucket, nameof(bucket));
            Require.Objects.NotNull(documentCollectionRepository, nameof(documentCollectionRepository));
            Require.Objects.NotNull(animalRepository, nameof(animalRepository));
            Require.Objects.NotNull(articleRepository, nameof(articleRepository));
            
            _logger = logger;
            _bucket = bucket;
            _documentCollectionRepository = documentCollectionRepository;
            _animalRepository = animalRepository;
            _articleRepository = articleRepository;
        }

        public async Task RunAsync()
        {
            await foreach (var documentCollectionItem in _documentCollectionRepository.GetAllItemsAsync())
            {
                var query = new  ApiQueryRequest
                {
                    Filter =$"{common.ImageIds}~{All}~{documentCollectionItem.Id}"
                };

               var count = await _animalRepository.GetCountAsync(query.ToDbQuery());
               
               if (count == 0)
               {
                   count = await _articleRepository.GetCountAsync(query.ToDbQuery());
               }

               if (count == 0)
               {
                   foreach (var fileId in documentCollectionItem.TypeNameToDocumentId.Values)
                   {
                       await _bucket.RemoveFileAsync(fileId);

                       _logger.LogInformation($"Deleted file from 'bucket' with id: {fileId}");
                   }

                   await _documentCollectionRepository.DeleteAsync(documentCollectionItem.Id);
                   
                   _logger.LogInformation($"Deleted item from 'document collection' with id: {documentCollectionItem.Id}");
                }
            }
        }
    }
}
