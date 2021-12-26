using System;
using System.Collections.Generic;
using AnimalRescue.Infrastructure.Configuration;
using Microsoft.Extensions.Configuration;

namespace Migration.Runner.Configurations
{
    public class ImageSizeConfiguration
    {
        public IList<ImageSize> Sizes { get; }

        public ImageSizeConfiguration(IConfiguration configuration)
        {
            Sizes = configuration.GetTypedSection<List<ImageSize>>(nameof(ImageSizeConfiguration));
        }
    }
}
