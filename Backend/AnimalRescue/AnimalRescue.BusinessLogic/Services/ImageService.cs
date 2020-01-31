using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using AnimalRescue.Contracts.BusinessLogic.Interfaces;
using AnimalRescue.DataAccess.Mongodb.Exceptions;
using AnimalRescue.DataAccess.Mongodb.Interfaces;
using AnimalRescue.Infrastructure.Validation;
using Microsoft.AspNetCore.Http;

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

        public async Task<Dictionary<string, Guid>> CreateAsync(IFormFile sourceImage)
        {
            if (sourceImage == null || sourceImage.Length == 0)
            {
                // TODO exception logging
                return new Dictionary<string, Guid>();
            }

            Image image;
            try
            {
                image = Image.FromStream(sourceImage.OpenReadStream());
            }
            catch (ArgumentException)
            {
                // TODO exception logging
                // sourceImage contains file with no supported format
                return new Dictionary<string, Guid>();
            }

            var uploadImageTasks = _imageSizeConfiguration.Sizes
                .Select(async imageSize =>
                {
                    var resizedImage = ResizeImage(image, imageSize.Width, imageSize.Height);
                    using (var imageStream = new MemoryStream())
                    {
                        resizedImage.Save(imageStream, ImageFormat.Png);

                        // TODO have to be refactored when an ObjectId type be replaced by Guid
                        var addedImageId = (await _bucket.UploadFileBytesAsync(imageStream.ToArray(), sourceImage.FileName, sourceImage.ContentType)).AsGuid();

                        return new KeyValuePair<string, Guid>(imageSize.Name, addedImageId);
                    }
                })
                .ToList();

            await Task.WhenAll(uploadImageTasks);
            return uploadImageTasks.Select(x => x.Result).ToDictionary(k => k.Key, v => v.Value);

        }

        public async Task<List<Dictionary<string, Guid>>> CreateAsync(IList<IFormFile> images)
        {
            var tasks = images.Select(CreateAsync).ToArray();
            await Task.WhenAll(tasks);
            var ids = tasks.Select(x => x.Result).ToList();

            return ids;
        }

        private Bitmap ResizeImage(Image image, int width, int height)
        {

            var destRect = new Rectangle(0, 0, width, height);
            var destImage = new Bitmap(width, height);

            destImage.SetResolution(image.HorizontalResolution, image.VerticalResolution);

            using (var graphics = Graphics.FromImage(destImage))
            {
                graphics.CompositingMode = CompositingMode.SourceCopy;
                graphics.CompositingQuality = CompositingQuality.HighQuality;
                graphics.InterpolationMode = InterpolationMode.HighQualityBicubic;
                graphics.SmoothingMode = SmoothingMode.HighQuality;
                graphics.PixelOffsetMode = PixelOffsetMode.HighQuality;

                using (var wrapMode = new ImageAttributes())
                {
                    wrapMode.SetWrapMode(WrapMode.TileFlipXY);
                    graphics.DrawImage(image, destRect, 0, 0, image.Width, image.Height, GraphicsUnit.Pixel, wrapMode);
                }
            }

            return destImage;
        }
    }
}
