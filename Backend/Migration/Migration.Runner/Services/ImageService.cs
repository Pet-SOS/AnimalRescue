using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using AnimalRescue.DataAccess.Mongodb.Interfaces;
using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Models;
using Migration.Runner.Configurations;

namespace Migration.Runner.Services
{
    public class ImageService : IImageService
    {
        private readonly ImageSizeConfiguration _imageSizeConfiguration;
        private readonly IBucket _bucket;
        private readonly IBaseRepository<DocumentCollection> _documentCollectionRepository;

        public ImageService(
            ImageSizeConfiguration imageSizeConfiguration,
            IBucket bucket,
            IBaseRepository<DocumentCollection> documentCollectionRepository)
        {
            _imageSizeConfiguration = imageSizeConfiguration;
            _bucket = bucket;
            _documentCollectionRepository = documentCollectionRepository;
        }

        public async Task<string> Create(Stream imageStream, string fileName, string contentType)
        {
            if (imageStream == null || imageStream.Length == 0)
            {
                return null;
            }

            var image = Image.FromStream(imageStream);

            var uploadImageTasks = _imageSizeConfiguration.Sizes
                .Select(async imageSize =>
                {
                    var resizedImage = ResizeImage(image, imageSize.Width, imageSize.Height);

                    using (var imageStream = new MemoryStream())
                    {
                        resizedImage.Save(
                            imageStream,
                            ImageFormat.Png);

                        var addedImageId = (await _bucket.UploadFileBytesAsync(
                            imageStream.ToArray(),
                            fileName,
                            contentType).ConfigureAwait(false));

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
                }).ConfigureAwait(false);

            return resultId.Id;
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
