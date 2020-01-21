using AnimalRescue.Infrastructure.Configuration;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using AnimalRescue.Contracts.BusinessLogic.Configurations;

namespace AnimalRescue.Contracts.BusinessLogic.Interfaces
{
    public enum ImageResizeType { ThumbnailLarge, ThumbnailMedium, ThumbnailSmall };

    public class ImageResize : IImageResize
    {
        private IConfiguration _configuration;
        private ImageSizesSettings _imageSizesSettings;

        public Dictionary<ImageResizeType, (int Width, int Height)> Sizes { get; } = new Dictionary<ImageResizeType, (int Width, int Height)> {
            {ImageResizeType.ThumbnailLarge, (1920, 1080) },
            {ImageResizeType.ThumbnailMedium, (640, 480) },
            {ImageResizeType.ThumbnailSmall, (320, 240) }
        };

        ImageResize(IConfiguration configuration)
        {
            _configuration = configuration;
            _imageSizesSettings = _configuration.GetTypedSection<ImageSizesSettings>(nameof(ImageSizesSettings));
        }
    }
}