using System.Collections.Generic;

namespace AnimalRescue.DataAccess.Mongodb.Models.BaseItems
{
    public interface IImageIds
    {
        List<string> ImageIds { get; set; }
    }
}
