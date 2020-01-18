using System.Collections.Generic;

namespace AnimalRescue.Contracts.BusinessLogic.Models
{
    public class BaseCommonDto : BaseAndTimeDto
    {
        public List<string> ImageIds { get; set; } = new List<string>();
        public List<string> Tags { get; set; } 
    }
}
