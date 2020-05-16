using AnimalRescue.DataAccess.Mongodb.Configurations;
using AnimalRescue.DataAccess.Mongodb.Interfaces;
using AnimalRescue.DataAccess.Mongodb.Models;
using AnimalRescue.Infrastructure.Validation;

using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.GridFS;

using System;
using System.Collections.Generic;
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

        public async Task<bool> RemoveFileAsync(string id)
        {
            ObjectId objectId = ObjectId.Parse(id);

            return await RemoveFileAsync(objectId);
        }
        public async Task<bool> RemoveFileAsync(ObjectId id)
        {
            try
            {
                await gridFSBucket.DeleteAsync(id);
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public async Task<long> GetFilesCountAsync()
        {
            var filter = Builders<GridFSFileInfo>.Filter.Empty;
            var options = new GridFSFindOptions { };
            long counter = 0;

            using IAsyncCursor<GridFSFileInfo> cursor = await gridFSBucket.FindAsync(filter, options);
            await cursor.ForEachAsync(x => counter++);
            return counter;
        }

        public async IAsyncEnumerable<GridFSFileInfo> GetFileIdsAsync()
        {
            var filter = Builders<GridFSFileInfo>.Filter.Empty;
            var options = new GridFSFindOptions { };

            using IAsyncCursor<GridFSFileInfo> cursor = await gridFSBucket.FindAsync(filter, options);

            while (await cursor.MoveNextAsync())
            {
                foreach (GridFSFileInfo current in cursor.Current)
                {
                    yield return current;
                }
            }
        }
    }
}
