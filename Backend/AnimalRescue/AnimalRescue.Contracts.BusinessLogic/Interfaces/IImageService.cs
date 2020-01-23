using System.Drawing;

namespace AnimalRescue.Contracts.BusinessLogic.Interfaces
{
    public interface IImageService
    {
        Bitmap GetResizedImage(Bitmap sourceBitmap, ImageResizeType imageResizeType);
    }
}
