using System.IO;
using System.Threading.Tasks;

namespace AnimalRescue.DataAccess.Mongodb.Interfaces
{
    public interface IBucket
    {
        Task<string> UploadFileStreamAsync(Stream fileStream, string fileName);
        Task<string> UploadFileBytesAsync(byte[] fileBytes, string fileName);
        Task<byte[]> GetFileBytesAsync(string fileId);
    }
}
