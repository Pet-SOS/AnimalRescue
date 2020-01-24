using System.Collections.Generic;
using AnimalRescue.Contracts.BusinessLogic.Attributes;
using common = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Common;

namespace AnimalRescue.Contracts.BusinessLogic.Models
{
    public class BaseCommonDto : BaseAndTimeDto
    {
        [CouplingPropertyDto(common.ImageIds)]
        public List<string> ImageIds { get; set; } = new List<string>();

        [CouplingPropertyDto(common.Tags)]
        public List<string> Tags { get; set; } 
    }
}
