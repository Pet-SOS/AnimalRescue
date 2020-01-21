using System.Drawing;

namespace AnimalRescue.Contracts.BusinessLogic.Configurations
{
    public interface IImageSizesSettings
    {
        public Size Small { get; set; }
        public Size Medium { get; set; }
        public Size Large { get; set; }
    }
}
