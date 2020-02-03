using AnimalRescue.Contracts.BusinessLogic.Interfaces;
using AnimalRescue.Contracts.BusinessLogic.Models.Configurations;
using AnimalRescue.Infrastructure.Configuration;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using AnimalRescue.Infrastructure.Validation;

namespace AnimalRescue.Contracts.BusinessLogic.Models.Additional
{
    public class ImageSizeConfiguration : IImageSizeConfiguration
    {
        public IList<ImageSize> Sizes { get; }

        public ImageSizeConfiguration(IConfiguration configuration)
        {
            Require.Objects.NotNull(configuration, nameof(configuration));

            Sizes = configuration.GetTypedSection<List<ImageSize>>(nameof(ImageSizeConfiguration));
        }
    }
}
