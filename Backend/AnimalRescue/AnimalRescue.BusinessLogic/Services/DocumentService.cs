using AnimalRescue.Contracts.Services;
using AnimalRescue.DataAccess.Mongodb.Interfaces;
using AnimalRescue.Infrastructure.Validation;

using Microsoft.AspNetCore.Http;

using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;


namespace AnimalRescue.BusinessLogic.Services
{
    public class DocumentService : IDocumentService
    {
        private readonly IBucket bucket;

        public DocumentService(IBucket bucket)
        {
            Require.Objects.NotNull(bucket, nameof(bucket));

            this.bucket = bucket;
        }

        public async Task<byte[]> GetFileBytesAsync(string fileId)
        {
            Require.Strings.NotNullOrWhiteSpace(fileId, nameof(fileId));
            var result = await bucket.GetFileBytesAsync(fileId);

            return result;
        }

        public async Task<List<string>> UploadFilesAsync(List<IFormFile> files)
        {
            Require.Collections.NotEmpty(files, nameof(files));

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
