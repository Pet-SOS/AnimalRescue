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
using AutoMapper;
using Microsoft.AspNetCore.Http;
using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace AnimalRescue.BusinessLogic.Services
{
    class OrganizationDocumentsService : IOrganizationDocumentsService
    {
        private readonly IMapper _mapper;
        private readonly IOrganizationDocumentRepository _orgDocRepository;
        private readonly IBucket _bucket;

        public OrganizationDocumentsService(IMapper mapper, IBucket bucket,
            IOrganizationDocumentRepository orgDocRepository)
        {
            _mapper = mapper;
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

        public async Task CreateAsync(UploadOrganizationDocumentModel model)
        {
            var orgDoc = _mapper.Map<UploadOrganizationDocumentModel, OrganizationDocument>(model);

            await _orgDocRepository.CreateAsync(orgDoc);
        }

        public async Task DeleteAsync(Guid bucketId)
        {
            var deletedResult = await _orgDocRepository.DeleteAsync(bucketId.ToString());

            Require.Booleans.IsTrue<NotFoundException>(deletedResult,
                "Failed to delete document. Probably document is not found.");

            await _bucket.RemoveFile(bucketId.AsObjectId());
        }

        public async Task<UploadOrganizationDocumentModel> UploadFileAsync((IFormFile, string) data)
        {
            Require.Objects.NotNull(data.Item1, "The file has not been uploaded.");

            var bucketFileId = string.Empty;
            using (Stream fileStream = data.Item1.OpenReadStream())
            {
                bucketFileId = await _bucket.UploadFileStreamAsync(fileStream, data.Item1.FileName, data.Item1.ContentType);
            }

            return new UploadOrganizationDocumentModel
            {
                BucketId = bucketFileId.AsGuid(),
                FileName = data.Item1.FileName,
                UserId = data.Item2
            };
        }
    }
}
