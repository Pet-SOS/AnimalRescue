using Microsoft.AspNetCore.Http;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace AnimalRescue.Contracts.Services
{
    public interface IDocumentService
    {
        Task<List<string>> UploadFilesAsync(List<IFormFile> files);
        Task<byte[]> GetFileBytesAsync(string fileId);
    }
}
