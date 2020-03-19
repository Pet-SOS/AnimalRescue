using AnimalRescue.Contracts.BusinessLogic.Interfaces;
using AnimalRescue.DataAccess.Mongodb.Extensions;
using AnimalRescue.DataAccess.Mongodb.Interfaces;
using AnimalRescue.DataAccess.Mongodb.Models;
using AnimalRescue.Infrastructure.Validation;

using Microsoft.AspNetCore.Http;

using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

using AnimalRescue.Contracts.BusinessLogic.Models;
using AutoMapper;
using AnimalRescue.Contracts.BusinessLogic.Models.Document;
using AnimalRescue.Contracts.Common.Query;
using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.BusinessLogic.Extensions;
using AnimalRescue.Contracts.Common.Exceptions;

namespace AnimalRescue.BusinessLogic.Services
{
    internal class DocumentService : IDocumentService
    {
        private readonly IBucket _bucket;
        private readonly IMapper _mapper;
        private readonly IOrganizationDocumentRepository _orgDocRepository;

        public DocumentService(IBucket bucket, IMapper mapper,
            IOrganizationDocumentRepository orgDocRepository)
        {
            Require.Objects.NotNull(bucket, nameof(bucket));
            Require.Objects.NotNull(mapper, nameof(mapper));

            _bucket = bucket;
            _mapper = mapper;
            _orgDocRepository = orgDocRepository;
        }

        public async Task<BucketItemDto> GetAsync(Guid fileId)
        {
            var bucketItem = await _bucket.GetFileBytesAsync(fileId.AsObjectId());
            var bucketItemDto = _mapper.Map<BucketItem, BucketItemDto>(bucketItem);
            return bucketItemDto;
        }

        public async Task<List<Guid>> UploadFileAsync(List<IFormFile> files)
        {
            if (files == null || files.Count == 0)
            {
                return new List<Guid>();
            }

            var tasks = files.Select(UploadFileStreamAsync).ToArray();
            await Task.WhenAll(tasks);
            var ids = tasks.Select(x => x.Result.AsGuid()).ToList();

            return ids;
        }

        public async Task<UploadOrganizationDocumentModel> UploadFileAsync((IFormFile, string) data)
        {
            Require.Objects.NotNull(data.Item1, "The file has not been uploaded.");

            var bucketFileId = await UploadFileStreamAsync(data.Item1);
            return new UploadOrganizationDocumentModel
            {
                BucketId = bucketFileId.AsGuid(),
                FileName = data.Item1.FileName,
                UserId = data.Item2
            };
        }

        public async Task<BlCollectonResponse<GetOrganizationDocsDocumentViewItem>> GetAsync(ApiQueryRequest queryRequest)
        {
            var dbQuery = queryRequest.ToDbQuery();
            var files = await _orgDocRepository.GetAsync(dbQuery);
            var totalNumberOf = await _orgDocRepository.GetCountAsync(dbQuery);

            var result = files.Select(x => new GetOrganizationDocsDocumentViewItem
            {
                Id = x.BucketId,
                FileName = x.Name
            }).ToList();

            return new BlCollectonResponse<GetOrganizationDocsDocumentViewItem>
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

        #region Private

        private async Task<string> UploadFileStreamAsync(IFormFile file)
        {
            using (Stream fileStream = file.OpenReadStream())
            {
                return await _bucket.UploadFileStreamAsync(fileStream, file.FileName, file.ContentType);
            }
        }

        #endregion
    }
}
