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
                // sourceImage contains not image format
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
                        var addedImageId = (await _bucket.UploadFileStreamAsync(imageStream, sourceImage.FileName)).AsGuid();

                        return new KeyValuePair<string, Guid>(imageSize.Size, addedImageId);
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

        private Bitmap ResizeImage(Image image, int newWidth, int newHeight)
        {
            var sourceWidth = image.Width;
            var sourceHeight = image.Height;

            //Consider vertical pics
            if (sourceWidth < sourceHeight)
            {
                var buff = newWidth;

                newWidth = newHeight;
                newHeight = buff;
            }

            int sourceX = 0, sourceY = 0, destX = 0, destY = 0;
            float nPercent;

            var nPercentWidth = (newWidth / (float)sourceWidth);
            var nPercentHeight = (newHeight / (float)sourceHeight);
            if (nPercentHeight < nPercentWidth)
            {
                nPercent = nPercentHeight;
                destX = Convert.ToInt16((newWidth -
                                                (sourceWidth * nPercent)) / 2);
            }
            else
            {
                nPercent = nPercentWidth;
                destY = Convert.ToInt16((newHeight -
                                                (sourceHeight * nPercent)) / 2);
            }

            var destWidth = (int)(sourceWidth * nPercent);
            var destHeight = (int)(sourceHeight * nPercent);

            var bmPhoto = new Bitmap(newWidth, newHeight, PixelFormat.Format24bppRgb);

            bmPhoto.SetResolution(image.HorizontalResolution, image.VerticalResolution);

            using (var grPhoto = Graphics.FromImage(bmPhoto))
            {
                grPhoto.Clear(Color.Black);
                grPhoto.InterpolationMode = InterpolationMode.HighQualityBicubic;

                grPhoto.DrawImage(image,
                        new Rectangle(destX, destY, destWidth, destHeight),
                        new Rectangle(sourceX, sourceY, sourceWidth, sourceHeight),
                        GraphicsUnit.Pixel);

                return bmPhoto;
            }
        }
    }
}
