using System.Collections.Generic;
using AnimalRescue.Contracts.BusinessLogic.Configurations;
using AnimalRescue.Contracts.BusinessLogic.Interfaces;
using AnimalRescue.Infrastructure.Configuration;
using Microsoft.Extensions.Configuration;

namespace AnimalRescue.Contracts.BusinessLogic.Models.Additional
{
    public enum ImageResizeType { ThumbnailLarge, ThumbnailMedium, ThumbnailSmall };

    public class ImageResize : IImageResize
    {
        private readonly IConfiguration _configuration;

        public Dictionary<ImageResizeType, (int Width, int Height)> Sizes { get; private set; }

        public ImageResize(IConfiguration configuration)
        {
            _configuration = configuration;
            InitializeImageSizes();
        }

        private void InitializeImageSizes()
        {
            var imageSizesSettings = _configuration.GetTypedSection<ImageSizesSettings>(nameof(ImageSizesSettings));

            Sizes = new Dictionary<ImageResizeType, (int Width, int Height)>
            {
                {
                    ImageResizeType.ThumbnailLarge, (imageSizesSettings.Large.Width, imageSizesSettings.Large.Height)
                },
                {
                    ImageResizeType.ThumbnailMedium, (imageSizesSettings.Medium.Width, imageSizesSettings.Medium.Height)
                },
                {
                    ImageResizeType.ThumbnailSmall, (imageSizesSettings.Small.Width, imageSizesSettings.Small.Height)
                }
            };
        }
    }
}