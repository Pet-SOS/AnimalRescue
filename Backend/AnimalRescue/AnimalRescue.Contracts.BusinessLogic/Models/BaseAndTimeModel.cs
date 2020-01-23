using System;
using AnimalRescue.Contracts.BusinessLogic.Attributes;
using baseItem = AnimalRescue.Contracts.Common.Constants.PropertyConstants.BaseItem;

namespace AnimalRescue.Contracts.BusinessLogic.Models
{
    public class BaseAndTimeDto : BaseDto
    {
        [CouplingPropertyDto(baseItem.CreatedAt)]
        public DateTime CreatedAt { get; set; }

        [CouplingPropertyDto(baseItem.ModifiedAt)]
        public DateTime? ModifiedAt { get; set; }

        [CouplingPropertyDto(baseItem.CreatedBy)]
        public string CreatedBy { get; set; }

        [CouplingPropertyDto(baseItem.ModifiedBy)]
        public string ModifiedBy { get; set; }
    }
}
