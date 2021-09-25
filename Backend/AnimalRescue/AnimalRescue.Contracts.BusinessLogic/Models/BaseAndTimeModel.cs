using AnimalRescue.Contracts.BusinessLogic.Attributes;

using System;

using baseItem = AnimalRescue.Contracts.Common.Constants.PropertyConstants.BaseItem;

namespace AnimalRescue.Contracts.BusinessLogic.Models
{
    public class BaseAndTimeDto<TId> : BaseDto<TId>
    {
        public DateTime CreatedAt { get; set; }

        public DateTime? ModifiedAt { get; set; }

        public string CreatedBy { get; set; }

        public string ModifiedBy { get; set; }

        [CouplingPropertyDto(baseItem.IsDeleted)]
        public bool IsDeleted { get; set; }

        [CouplingPropertyDto(baseItem.IsDeletable)]
        public bool IsDeletable { get; set; }
    }
}
