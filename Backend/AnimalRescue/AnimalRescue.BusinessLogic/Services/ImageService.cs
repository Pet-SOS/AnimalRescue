using AnimalRescue.Contracts.BusinessLogic.Interfaces;
using AnimalRescue.Infrastructure.Validation;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using AnimalRescue.DataAccess.Mongodb.Exceptions;
using AnimalRescue.DataAccess.Mongodb.Interfaces;

namespace AnimalRescue.BusinessLogic.Services
{
    internal class ImageService : IImageService
    {
        private readonly IImageSizeConfiguration _imageSizeConfiguration;

        private readonly IBucket _bucket;

        public ImageService(IImageSizeConfiguration imageSizeConfiguration, IBucket bucket)
        {
            Require.Objects.NotNull(imageSizeConfiguration, nameof(imageSizeConfiguration));
            Require.Collections.NotEmpty(imageSizeConfiguration.Sizes, nameof(imageSizeConfiguration.Sizes));

            Require.Objects.NotNull(bucket, nameof(bucket));

            _imageSizeConfiguration = imageSizeConfiguration;
            _bucket = bucket;
        }

        public async Task<Dictionary<string, Guid>> SaveImage(IFormFile sourceImage)
        {
            if (sourceImage == null || sourceImage.Length == 0)
            {
                // TODO exception logging
                return new Dictionary<string, Guid>();
            }

            using (var memoryStream = new MemoryStream())
            {
                await sourceImage.CopyToAsync(memoryStream);
                var image = Image.FromStream(memoryStream);

                var uploadImageTasks = _imageSizeConfiguration.Sizes
                    .Select(async imageSize =>
                    {
                        var resizedImage = new Bitmap(image, imageSize.Width, imageSize.Height);
                        using (var imageStream = new MemoryStream())
                        {
                            resizedImage.Save(imageStream, ImageFormat.Bmp);
                            // TODO have to be refactored when an ObjectId type be replaced by Guid
                            var addedImageId = (await _bucket.UploadFileStreamAsync(imageStream, sourceImage.FileName)).AsGuid();

                            return new KeyValuePair<string, Guid>(imageSize.Size, addedImageId);
                        }
                    })
                    .ToList();

                await Task.WhenAll(uploadImageTasks);
                return uploadImageTasks.Select(x => x.Result).ToDictionary(k => k.Key, v => v.Value);
            }
        }
    }
}
