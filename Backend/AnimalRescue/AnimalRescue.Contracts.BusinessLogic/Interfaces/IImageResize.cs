using System.Collections.Generic;
using AnimalRescue.Contracts.BusinessLogic.Models.Additional;

namespace AnimalRescue.Contracts.BusinessLogic.Interfaces
{
    public interface IImageResize
    {
        Dictionary<ImageResizeType, (int Width, int Height)> Sizes { get; }
    }
}
