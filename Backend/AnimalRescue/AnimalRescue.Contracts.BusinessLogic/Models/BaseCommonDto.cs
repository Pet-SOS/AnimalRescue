using AnimalRescue.Contracts.BusinessLogic.Attributes;

using System.Collections.Generic;

using common = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Common;

namespace AnimalRescue.Contracts.BusinessLogic.Models
{
    public class BaseCommonDto : BaseAndTimeDto
    {
        public List<string> ImageIds { get; set; } = new List<string>();

        [CouplingPropertyDto(common.CommonTag)]
        public List<string> Tags { get; set; } 
    }
}
