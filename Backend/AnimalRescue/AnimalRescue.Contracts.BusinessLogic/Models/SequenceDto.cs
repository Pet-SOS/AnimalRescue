using System;

namespace AnimalRescue.Contracts.BusinessLogic.Models
{
    public class SequenceDto : BaseAndTimeDto<Guid>
    {
        public int Number { get; set; }
    }
}
