using AnimalRescue.DataAccess.Mongodb.Configurations;
using AnimalRescue.DataAccess.Mongodb.Interfaces;
using AnimalRescue.DataAccess.Mongodb.Models;
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
    internal class Bucket : IBucket
    {
        protected IGridFSBucket gridFSBucket;

        private const string ContentTypeName = "contentType";
        public Bucket(IBucketSettings settings, IMongoDatabase database)
        {
            Require.Objects.NotNull(settings, nameof(settings));
            Require.Objects.NotNull(database, nameof(database));
            Require.Strings.NotNullOrWhiteSpace(settings.BucketName, nameof(settings.BucketName));

            GridFSBucketOptions bucketOptions = new GridFSBucketOptions() { BucketName = settings.BucketName };
            gridFSBucket = new GridFSBucket(database, bucketOptions);
        }

        public async Task<string> UploadFileBytesAsync(byte[] fileBytes, string fileName, string contentType)
        {
            Require.Collections.NotEmpty(fileBytes, nameof(fileBytes));
            string result = await UploadAsync(gridFSBucket.UploadFromBytesAsync, fileBytes, fileName, contentType);

            return result;
        }

        public async Task<string> UploadFileStreamAsync(Stream fileStream, string fileName, string contentType)
        {
            string result = await UploadAsync(gridFSBucket.UploadFromStreamAsync, fileStream, fileName, contentType);
            
            return result;
        }

        private async Task<string> UploadAsync<T>(
            Func<string, T, GridFSUploadOptions, CancellationToken, Task<ObjectId>> operation, 
            T fileData, 
            string fileName, 
            string contentType)
        {
            Require.Objects.NotNull(fileData, nameof(fileData));
            Require.Strings.NotNullOrWhiteSpace(fileName, nameof(fileName));
            Require.Strings.NotNullOrWhiteSpace(contentType, nameof(contentType));

            var gridFSUploadOptions = new GridFSUploadOptions
            {
                Metadata = new BsonDocument {
                    { ContentTypeName, contentType }
                }
            };

            ObjectId objectId = await operation(fileName, fileData, gridFSUploadOptions, default);

            return objectId.ToString();
        }

        public async Task<BucketItem> GetFileBytesAsync(ObjectId fileId)
        {
            byte[] bytes;
            string contentType = string.Empty;

            using (var stream = await gridFSBucket.OpenDownloadStreamAsync(fileId))
            {
                bytes = new byte[stream.Length];
                await stream.ReadAsync(bytes);

                contentType = stream.FileInfo?.Metadata?.GetValue(ContentTypeName)?.AsString;

                await stream.CloseAsync(); 
            }

            BucketItem bucketItem = new BucketItem() { Data = bytes, ContentType = contentType };
            return bucketItem;
        }

        public async Task RemoveFile(ObjectId id)
        {
            await gridFSBucket.DeleteAsync(id);
        }
    }
}
