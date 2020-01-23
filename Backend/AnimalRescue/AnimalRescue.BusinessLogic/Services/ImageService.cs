using AnimalRescue.Contracts.BusinessLogic.Interfaces;
using System;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using AnimalRescue.Contracts.BusinessLogic.Models.Additional;

namespace AnimalRescue.BusinessLogic.Services
{
    internal class ImageService : IImageService
    {
        private readonly ImageResize _imageResize;

        public ImageService(ImageResize imageResize)
        {
            _imageResize = imageResize;
        }

        public Bitmap GetResizedImage(Bitmap sourceBitmap, ImageResizeType imageResizeType)
        {
            Bitmap resBitmap;
            var newSize = _imageResize.Sizes[imageResizeType];
            int width;
            int height;

            if (sourceBitmap.Width > sourceBitmap.Height)
            {
                double ratioX = sourceBitmap.Width / newSize.Width;
                width = newSize.Width;
                height = (int)Math.Round(sourceBitmap.Height / ratioX);
            }
            else
            {
                double ratioY = sourceBitmap.Height / newSize.Height;
                width = (int)Math.Round(sourceBitmap.Width / ratioY);
                height = newSize.Height;
            }
            resBitmap = ResizeImage(sourceBitmap, width, height);

            return resBitmap;
        }

        private static Bitmap ResizeImage(Bitmap bitmap, int width, int height)
        {
            var destRect = new Rectangle(0, 0, width, height);
            var destImage = new Bitmap(width, height);

            destImage.SetResolution(bitmap.HorizontalResolution, bitmap.VerticalResolution);

            using (var graphics = Graphics.FromImage(destImage))
            {
                graphics.CompositingMode = CompositingMode.SourceCopy;
                graphics.CompositingQuality = CompositingQuality.HighQuality;
                graphics.InterpolationMode = InterpolationMode.HighQualityBicubic;
                graphics.SmoothingMode = SmoothingMode.HighQuality;
                graphics.PixelOffsetMode = PixelOffsetMode.HighQuality;

                using (var wrapMode = new ImageAttributes())
                {
                    wrapMode.SetWrapMode(WrapMode.TileFlipXY);
                    graphics.DrawImage(bitmap, destRect, 0, 0, bitmap.Width, bitmap.Height, GraphicsUnit.Pixel, wrapMode);
                }
            }

            return destImage;
        }

    }
}
