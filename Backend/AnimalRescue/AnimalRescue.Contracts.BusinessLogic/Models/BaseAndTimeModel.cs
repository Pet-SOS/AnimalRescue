using System;

namespace AnimalRescue.Contracts.BusinessLogic.Models
{
    public class BaseAndTimeDto<TId> : BaseDto<TId>
    {
        public DateTime CreatedAt { get; set; }

        public DateTime? ModifiedAt { get; set; }

        public string CreatedBy { get; set; }

        public string ModifiedBy { get; set; }
    }
}
