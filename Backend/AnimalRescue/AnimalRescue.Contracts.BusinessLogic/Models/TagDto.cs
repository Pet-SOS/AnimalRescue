using AnimalRescue.Contracts.BusinessLogic.Attributes;

using System;

using common = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Common;

namespace AnimalRescue.Contracts.BusinessLogic.Models
{
    public class TagDto : BaseAndTimeDto<Guid>
    {
        [CouplingPropertyDto(common.Type)]
        public string Type { get; set; }

        [CouplingPropertyDto(common.Title)]
        public string Title { get; set; }
    }
}
