using AnimalRescue.DataAccess.Mongodb.Models;
using MongoDB.Bson;
using System.IO;
using System.Threading.Tasks;

namespace AnimalRescue.DataAccess.Mongodb.Interfaces
{
    public interface IBucket
    {
        Task<string> UploadFileStreamAsync(Stream fileStream, string fileName, string contentType);
        Task<string> UploadFileBytesAsync(byte[] fileBytes, string fileName, string contentType);
        Task<BucketItem> GetFileBytesAsync(ObjectId fileId);
        Task RemoveFile(ObjectId id);
    }
}
