using AnimalRescue.Contracts.BusinessLogic.Interfaces;
using AnimalRescue.DataAccess.Mongodb.Exceptions;
using AnimalRescue.DataAccess.Mongodb.Interfaces;
using AnimalRescue.DataAccess.Mongodb.Models;
using AnimalRescue.Infrastructure.Validation;

using Microsoft.AspNetCore.Http;

using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;


namespace AnimalRescue.BusinessLogic.Services
{
    internal class DocumentService : IDocumentService
    {
        private readonly IBucket bucket;

        public DocumentService(IBucket bucket)
        {
            Require.Objects.NotNull(bucket, nameof(bucket));

            this.bucket = bucket;
        }

        public async Task<BucketItem> GetAsync(Guid fileId)
        {
            var result = await bucket.GetFileBytesAsync(fileId.AsObjectIdString());

            return result;
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

        private async Task<string> UploadFileStreamAsync(IFormFile file)
        {
            using (Stream fileStream = file.OpenReadStream())
            {
                return await bucket.UploadFileStreamAsync(fileStream, file.FileName, file.ContentType);
            }
        }
    }
}
