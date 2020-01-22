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

        public Dictionary<ImageResizeType, (int Width, int Height)> Sizes { get; } 

        ImageResize(IConfiguration configuration)
        {
            _configuration = configuration;
            _imageSizesSettings = _configuration.GetTypedSection<ImageSizesSettings>(nameof(ImageSizesSettings));

            Sizes = new Dictionary<ImageResizeType, (int Width, int Height)>();
            Sizes.Add(ImageResizeType.ThumbnailLarge, (_imageSizesSettings.Large.Width, _imageSizesSettings.Large.Height));
            Sizes.Add(ImageResizeType.ThumbnailMedium, (_imageSizesSettings.Medium.Width, _imageSizesSettings.Medium.Height));
            Sizes.Add(ImageResizeType.ThumbnailSmall, (_imageSizesSettings.Small.Width, _imageSizesSettings.Small.Height));
        }
    }
}