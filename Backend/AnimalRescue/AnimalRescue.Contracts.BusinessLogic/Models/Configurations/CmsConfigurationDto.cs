using System.Collections.Generic;
using AnimalRescue.Contracts.BusinessLogic.Attributes;
using cms = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Cms;

namespace AnimalRescue.Contracts.BusinessLogic.Models.Configurations
{
    public class CmsConfigurationDto : BaseDto
    {
        [CouplingPropertyDto(cms.Phones)]
        public List<string> Phones { get; set; }

        [CouplingPropertyDto(cms.SocialLinks)]
        public Dictionary<string, string> SocialLinks { get; set; }
    }
}
