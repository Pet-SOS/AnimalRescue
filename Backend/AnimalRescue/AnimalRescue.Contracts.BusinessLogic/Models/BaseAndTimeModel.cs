using System;

namespace AnimalRescue.Contracts.BusinessLogic.Models
{
    public class BaseAndTimeDto : BaseDto
    {
        public DateTime CreatedAt { get; set; }

        public DateTime? ModifiedAt { get; set; }

        public string CreatedBy { get; set; }

        public string ModifiedBy { get; set; }
    }
}
