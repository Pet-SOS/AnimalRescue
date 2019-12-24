using AnimalRescue.Contracts.BusinessLogic.Interfaces;
using AnimalRescue.DataAccess.Mongodb.Interfaces;
using AnimalRescue.Infrastructure.Validation;

using Microsoft.AspNetCore.Http;

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

        public async Task<byte[]> GetAsync(string fileId)
        {
            Require.Strings.NotNullOrWhiteSpace(fileId, nameof(fileId));
            var result = await bucket.GetFileBytesAsync(fileId);

            return result;
        }

        public async Task<List<string>> UploadFileAsync(List<IFormFile> files)
        {
            if (files == null 
                || files != null && files.Count == 0)
            {
                return new List<string>();
            }

            var tasks = files.Select(UploadFileStreamAsync).ToArray();
            await Task.WhenAll(tasks);
            var ids = tasks.Select(x => x.Result).ToList();

            return ids;
        }

        private async Task<string> UploadFileStreamAsync(IFormFile file)
        {
            using (Stream fileStream = file.OpenReadStream())
            {
                return await bucket.UploadFileStreamAsync(fileStream, file.FileName);
            }
        }
    }
}
