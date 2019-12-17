using AnimalRescue.DataAccess.Mongodb.Configurations;
using AnimalRescue.DataAccess.Mongodb.Interfaces;
using AnimalRescue.Infrastructure.Validation;

using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.GridFS;

using System;
using System.IO;
using System.Threading;
using System.Threading.Tasks;

namespace AnimalRescue.DataAccess.Mongodb
{
    public class Bucket : IBucket
    {
        protected IGridFSBucket gridFSBucket;
        public Bucket(IBucketSettings settings, IMongoDatabase database)
        {
            Require.Objects.NotNull(settings, nameof(settings));
            Require.Objects.NotNull(database, nameof(database));
            Require.Strings.NotNullOrWhiteSpace(settings.BucketName, nameof(settings.BucketName));

            GridFSBucketOptions bucketOptions = new GridFSBucketOptions() { BucketName = settings.BucketName };
            gridFSBucket = new GridFSBucket(database, bucketOptions);
        }

        public async Task<string> UploadFileBytesAsync(byte[] fileBytes, string fileName)
        {
            Require.Collections.NotEmpty(fileBytes, nameof(fileBytes));
            string result = await UploadAsync(gridFSBucket.UploadFromBytesAsync, fileBytes, fileName);

            return result;
        }

        public async Task<string> UploadFileStreamAsync(Stream fileStream, string fileName)
        {
            string result = await UploadAsync(gridFSBucket.UploadFromStreamAsync, fileStream, fileName);
            
            return result;
        }

        private async Task<string> UploadAsync<T>(
            Func<string, T, GridFSUploadOptions, CancellationToken, Task<ObjectId>> operation, 
            T fileData, 
            string fileName)
        {
            Require.Objects.NotNull(fileData, nameof(fileData));
            Require.Strings.NotNullOrWhiteSpace(fileName, nameof(fileName));

            ObjectId objectId = await operation(fileName, fileData, null, default(CancellationToken));

            return objectId.ToString();
        }

        public async Task<byte[]> GetFileBytesAsync(string fileId)
        {
            Require.Strings.NotNullOrWhiteSpace(fileId, nameof(fileId));

            ObjectId objectId = ObjectId.Parse(fileId);
            byte[] bytes = await gridFSBucket.DownloadAsBytesAsync(objectId);

            return bytes;
        }
    }
}
