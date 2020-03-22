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
using AnimalRescue.Contracts.Common.Exceptions;

namespace AnimalRescue.BusinessLogic.Services
{
    internal class DocumentService : IDocumentService
    {
        private readonly IBucket _bucket;
        private readonly IMapper _mapper;

        public DocumentService(IBucket bucket, IMapper mapper)
        {
            Require.Objects.NotNull(bucket, nameof(bucket));
            Require.Objects.NotNull(mapper, nameof(mapper));

            _bucket = bucket;
            _mapper = mapper;
        }

        public async Task<BucketItemDto> GetAsync(Guid fileId)
        {
            var bucketItem = await _bucket.GetFileBytesAsync(fileId.AsObjectId());
            var bucketItemDto = _mapper.Map<BucketItem, BucketItemDto>(bucketItem);
            return bucketItemDto;
        }

        public async Task<List<UploadDocumentModel>> UploadFileAsync(IEnumerable<IFormFile> files)
        {
            if (files is null || !files.Any())
            {
                return null;
            }

            var tasks = files.Select(UploadFileAsync).ToArray();
            var uploadedResult = await Task.WhenAll(tasks);

            return uploadedResult.ToList();
        }

        public async Task<UploadDocumentModel> UploadFileAsync(IFormFile file)
        {
            Require.Objects.NotNull<BadRequestException>(file, "Failed to upload file.");

            var uploadedResult = await UploadFileStreamAsync(file);

            return uploadedResult;
        }

        #region Private

        private async Task<UploadDocumentModel> UploadFileStreamAsync(IFormFile file)
        {
            var fileId = string.Empty;
            using (Stream fileStream = file.OpenReadStream())
            {
                fileId = await _bucket.UploadFileStreamAsync(fileStream, file.FileName, file.ContentType);
            }

            return new UploadDocumentModel
            {
                Id = fileId.AsGuid(),
                FileName = file.FileName
            };
        }

        #endregion
    }
}
