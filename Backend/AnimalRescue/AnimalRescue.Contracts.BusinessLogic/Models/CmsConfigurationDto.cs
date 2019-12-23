using System.Collections.Generic;

namespace AnimalRescue.Contracts.BusinessLogic.Models
{
    public class CmsConfigurationDto : BaseDto
    {
        public List<string> Phones { get; set; }

        public Dictionary<string, string> SocialLinks { get; set; }
    }
}
