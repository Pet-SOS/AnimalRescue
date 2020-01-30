using AnimalRescue.Contracts.BusinessLogic.Attributes;
using common = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Common;

namespace AnimalRescue.Contracts.BusinessLogic.Models
{
    public class BucketItemDto
    {
        [CouplingPropertyDto(common.Data)]
        public byte[] Data { get; set; }

        [CouplingPropertyDto(common.ContentType)]
        public string ContentType { get; set; }
    }
}
