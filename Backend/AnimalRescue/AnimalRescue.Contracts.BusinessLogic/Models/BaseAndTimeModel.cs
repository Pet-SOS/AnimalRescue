using System;

namespace AnimalRescue.Contracts.BusinessLogic.Models
{
    public class BaseAndTimeDto : BaseDto
    {
        public DateTimeOffset CreatedAt { get; set; }

        public DateTimeOffset? ModifiedAt { get; set; }

        public string CreatedBy { get; set; }

        public string ModifiedBy { get; set; }
    }
}
