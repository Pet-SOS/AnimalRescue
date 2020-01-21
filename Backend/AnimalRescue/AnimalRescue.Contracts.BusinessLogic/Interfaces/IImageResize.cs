using System.Collections.Generic;

namespace AnimalRescue.Contracts.BusinessLogic.Interfaces
{
    public interface IImageResize
    {
        Dictionary<ImageResizeType, (int Width, int Height)> Sizes { get; }
    }
}
