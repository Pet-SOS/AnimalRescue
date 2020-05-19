using AnimalRescue.BusinessLogic.Extensions;
using AnimalRescue.Contracts.BusinessLogic.Interfaces;
using AnimalRescue.Contracts.BusinessLogic.Models;
using AnimalRescue.Contracts.BusinessLogic.Models.Document;
using AnimalRescue.Contracts.Common.Exceptions;
using AnimalRescue.Contracts.Common.Query;
using AnimalRescue.DataAccess.Mongodb.Extensions;
using AnimalRescue.DataAccess.Mongodb.Interfaces;
using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Models;
using AnimalRescue.Infrastructure.Validation;

using System;
using System.Linq;
using System.Threading.Tasks;

namespace AnimalRescue.BusinessLogic.Services
{
    class OrganizationDocumentService : 
        IOrganizationDocumentService
    {
        private readonly IOrganizationDocumentRepository _orgDocRepository;
        private readonly IBucket _bucket;

        public OrganizationDocumentService(IBucket bucket,
            IOrganizationDocumentRepository orgDocRepository)
        {
            Require.Objects.NotNull(bucket, nameof(bucket));
            Require.Objects.NotNull(orgDocRepository, nameof(orgDocRepository));

            _bucket = bucket;
            _orgDocRepository = orgDocRepository;
        }

        public async Task<BlCollectonResponse<GetDocumentsOrganizationViewItem>> GetAsync(ApiQueryRequest queryRequest)
        {
            var dbQuery = queryRequest.ToDbQuery();
            var files = await _orgDocRepository.GetAsync(dbQuery);
            var totalNumberOf = await _orgDocRepository.GetCountAsync(dbQuery);

            var result = files.Select(x => new GetDocumentsOrganizationViewItem
            {
                Id = x.BucketId,
                FileName = x.Name
            }).ToList();

            return new BlCollectonResponse<GetDocumentsOrganizationViewItem>
            { Collection = result, TotalCount = totalNumberOf };
        }

        public async Task<GetDocumentsOrganizationViewItem> CreateAsync(UploadDocumentModel model, Guid userId)
        {
            Require.Objects.NotNull<BadRequestException>(model, "Failed to save document. Probably document is not uploaded.");

            var orgDoc = new OrganizationDocument()
            {
                BucketId = model.Id.ToString(),
                Name = model.FileName,
                CreatedBy = userId.ToString(),
            };

            await _orgDocRepository.CreateAsync(orgDoc);

            return new GetDocumentsOrganizationViewItem { FileName = orgDoc.Name, Id = orgDoc.BucketId };
        }

        public async Task DeleteAsync(Guid bucketId)
        {
            await _orgDocRepository.DeleteAsync(bucketId.ToString());
            await _bucket.RemoveFileAsync(bucketId.AsObjectId());
        }
    }
}
