using AnimalRescue.DataAccess.Mongodb.Models;

using MongoDB.Bson;
using MongoDB.Driver.GridFS;

using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace AnimalRescue.DataAccess.Mongodb.Interfaces
{
    public interface IBucket
    {
        Task<string> UploadFileStreamAsync(Stream fileStream, string fileName, string contentType);
        Task<string> UploadFileBytesAsync(byte[] fileBytes, string fileName, string contentType);
        Task<BucketItem> GetFileBytesAsync(ObjectId fileId);
        Task<bool> RemoveFileAsync(ObjectId id);
        Task<bool> RemoveFileAsync(string id);
        Task<long> GetFilesCountAsync();
        IAsyncEnumerable<GridFSFileInfo> GetFileIdsAsync();
    }
}
