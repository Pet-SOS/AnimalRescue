using AnimalRescue.Contracts.BusinessLogic.Attributes;

using System;
using System.Collections.Generic;

using common = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Common;

namespace AnimalRescue.Contracts.BusinessLogic.Models
{
    public class BaseCommonDto : BaseAndTimeDto
    {
        [CouplingPropertyDto(common.ImageIds)]
        public List<Dictionary<string, Guid>> ImageIds { get; set; } = new List<Dictionary<string, Guid>>();

        [CouplingPropertyDto(common.CommonTag)]
        public List<string> Tags { get; set; } 
    }
}
