using System.Drawing;
using AnimalRescue.Contracts.BusinessLogic.Models.Additional;

namespace AnimalRescue.Contracts.BusinessLogic.Interfaces
{
    public interface IImageService
    {
        Bitmap GetResizedImage(Bitmap sourceBitmap, ImageResizeType imageResizeType);
    }
}
