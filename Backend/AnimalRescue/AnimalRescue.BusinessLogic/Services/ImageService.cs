using AnimalRescue.Contracts.BusinessLogic.Interfaces;
using AnimalRescue.DataAccess.Mongodb.Exceptions;
using AnimalRescue.DataAccess.Mongodb.Interfaces;
using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Models;
using AnimalRescue.Infrastructure.Validation;

using Microsoft.AspNetCore.Http;

using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace AnimalRescue.BusinessLogic.Services
{
    internal class ImageService : IImageService
    {
        private readonly IImageSizeConfiguration _imageSizeConfiguration;

        private readonly IBucket _bucket;
        private readonly IDocumentCollectionRepository _documentCollectionRepository;

        public ImageService(
            IImageSizeConfiguration imageSizeConfiguration,
            IBucket bucket,
            IDocumentCollectionRepository documentCollectionRepository)
        {
            Require.Objects.NotNull(bucket, nameof(bucket));
            Require.Objects.NotNull(documentCollectionRepository, nameof(documentCollectionRepository));
            Require.Objects.NotNull(imageSizeConfiguration, nameof(imageSizeConfiguration));
            Require.Collections.NotEmpty(imageSizeConfiguration.Sizes, nameof(imageSizeConfiguration.Sizes));

            _imageSizeConfiguration = imageSizeConfiguration;
            _bucket = bucket;
            _documentCollectionRepository = documentCollectionRepository;
        }

        public async Task<Guid?> CreateAsync(IFormFile sourceImage)
        {
            if (sourceImage == null || sourceImage.Length == 0)
            {
                // TODO exception logging
                return null;
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
                return null;
            }

            var uploadImageTasks = _imageSizeConfiguration.Sizes
                .Select(async imageSize =>
                {
                    var resizedImage = ResizeImage(image, imageSize.Width, imageSize.Height);

                    using (var imageStream = new MemoryStream())
                    {
                        resizedImage.Save(
                            imageStream,
                            ImageFormat.Png);

                        // TODO have to be refactored when an ObjectId type be replaced by Guid
                        var addedImageId = (await _bucket.UploadFileBytesAsync(
                            imageStream.ToArray(), 
                            sourceImage.FileName, 
                            sourceImage.ContentType));

                        return new KeyValuePair<string, string>(
                            imageSize.Name, 
                            addedImageId);
                    }
                })
                .ToList();

            await Task.WhenAll(uploadImageTasks);

            var resultId = await _documentCollectionRepository
                .CreateAsync(new DocumentCollection
                {
                    TypeNameToDocumentId = uploadImageTasks
                        .Select(x => x.Result)
                        .ToDictionary(k => k.Key.ToLower(), v => v.Value)
                });

            return resultId.Id.AsGuid();
        }

        public async Task<List<Guid>> CreateAsync(IList<IFormFile> images)
        {
            var tasks = images.Select(CreateAsync).ToArray();
            await Task.WhenAll(tasks);

            var ids = tasks
                .Select(x => x.Result)
                .Where(x => x != null)
                .Select(x => (Guid)x)
                .ToList();

            return ids;
        }

        private Size GetAdjustedSize(Image image, int width, int height)
        {
            var newSize = new Size(width, height);
            int newWidthActual;
            int newHeightActual;

            if (image.Width > image.Height)
            {
                double ratioX = (double)image.Width / (double)newSize.Width;
                newWidthActual = newSize.Width;
                newHeightActual = (int)Math.Round(image.Height / ratioX);
            }
            else
            {
                double ratioY = (double)image.Height / (double)newSize.Height;
                newWidthActual = (int)Math.Round(image.Width / ratioY);
                newHeightActual = newSize.Height;
            }

            return new Size(newWidthActual, newHeightActual);
        }

        private Bitmap ResizeImage(Image image, int width, int height)
        {
            var adjustedSize = GetAdjustedSize(image, width, height);

            var destRect = new Rectangle(0, 0, adjustedSize.Width, adjustedSize.Height);
            var destImage = new Bitmap(adjustedSize.Width, adjustedSize.Height);

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
