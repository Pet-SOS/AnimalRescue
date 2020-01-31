using System.Collections.Generic;
using AnimalRescue.Contracts.BusinessLogic.Models.Configurations;

namespace AnimalRescue.Contracts.BusinessLogic.Interfaces
{
    public interface IImageSizeConfiguration
    {
        IList<ImageSize> Sizes { get; }
    }
}
